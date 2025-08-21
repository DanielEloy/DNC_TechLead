// dateComparator.js
class DateComparator {
  constructor(date = null) {
    this.date = date ? new Date(date) : new Date();
  }

  static from(dateString) {
    return new DateComparator(dateString);
  }

  compare(targetDate, baseDate = null) {
    const base = baseDate ? new Date(baseDate) : new Date();
    const target = new Date(targetDate);
    
    if (isNaN(target)) {
      throw new Error("Invalid target date");
    }

    const diffMs = target - base;
    const isPast = diffMs < 0;
    const absDiff = Math.abs(diffMs);

    return {
      milliseconds: absDiff,
      seconds: Math.floor(absDiff / 1000),
      minutes: Math.floor(absDiff / (1000 * 60)),
      hours: Math.floor(absDiff / (1000 * 60 * 60)),
      days: Math.floor(absDiff / (1000 * 60 * 60 * 24)),
      weeks: Math.floor(absDiff / (1000 * 60 * 60 * 24 * 7)),
      months: this._calcMonthsDiff(base, target),
      years: this._calcYearsDiff(base, target),
      
      isPast,
      isFuture: !isPast,
      isToday: this._isSameDay(base, target),
      isWeekend: this._isWeekend(target),
      
      format: (format = 'default') => this._formatDiff(absDiff, isPast, format),
      humanize: (lang = 'en') => this._humanizeDiff(base, target, lang)
    };
  }

  _calcMonthsDiff(base, target) {
    const years = target.getFullYear() - base.getFullYear();
    const months = target.getMonth() - base.getMonth();
    return years * 12 + months;
  }

  _calcYearsDiff(base, target) {
    return target.getFullYear() - base.getFullYear();
  }

  _isSameDay(date1, date2) {
    return date1.toDateString() === date2.toDateString();
  }

  _isWeekend(date) {
    return [0, 6].includes(date.getDay());
  }

  _formatDiff(ms, isPast, format) {
    const formats = {
      short: () => {
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        if (days > 0) return `${days}d ${Math.floor((ms % (86400000)) / 3600000)}h`;
        return `${Math.floor(ms / 3600000)}h ${Math.floor((ms % 3600000) / 60000)}m`;
      },
      long: () => {
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        return `${days} days, ${hours} hours, ${minutes} minutes`;
      },
      default: () => {
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return `${days}d ${hours}h`;
      }
    };

    return `${isPast ? 'Ago' : 'In'} ${(formats[format] || formats.default)()}`;
  }

  _humanizeDiff(base, target, lang) {
    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
    const diff = target - base;
    const units = [
      { unit: 'year', ms: 31536000000 },
      { unit: 'month', ms: 2628000000 },
      { unit: 'week', ms: 604800000 },
      { unit: 'day', ms: 86400000 },
      { unit: 'hour', ms: 3600000 },
      { unit: 'minute', ms: 60000 }
    ];

    for (const { unit, ms } of units) {
      if (Math.abs(diff) >= ms) {
        return rtf.format(Math.round(diff / ms), unit);
      }
    }
    return rtf.format(Math.round(diff / 1000), 'second');
  }

  // Métodos estáticos utilitários
  static isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  static addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static diffInDays(date1, date2) {
    return Math.floor((new Date(date2) - new Date(date1)) / (1000 * 60 * 60 * 24));
  }
}

// Exemplo de uso:
// const diff = DateComparator.from('2025-12-25').compare();
// console.log(diff.format('long'));
// console.log(diff.humanize('pt'));

export default DateComparator;