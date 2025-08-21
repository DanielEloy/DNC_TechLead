Esta biblioteca oferece:

Comparação completa entre datas com múltiplas unidades de tempo (milissegundos até anos)
Métodos de formatação para diferentes necessidades:

Formato curto: 2d 5h
Formato longo: 2 days, 5 hours, 30 minutes
Formato humanizado: "in 2 months" (com suporte a internacionalização)

# Funcionalidades extras:

Verificação de fim de semana
Detecção de datas passadas/futuras
Cálculo preciso de meses e anos
Suporte a múltiplos idiomas para formatação
Métodos estáticos utilitários

Uso simplificado:

javascript

# Comparar com data atual
DateComparator.from('2025-12-25').compare()

# Comparar duas datas específicas
DateComparator.from('2025-12-25').compare('2026-01-01')

# Formatando resultados
const diff = DateComparator.from('2025-12-25').compare()
console.log(diff.format('short'))
console.log(diff.humanize('pt'))


Explicação da Biblioteca
A biblioteca DateComparator que criei possui as seguintes funcionalidades:

Recursos Principais:
Comparação de datas - Calcula diferenças entre duas datas em várias unidades (dias, horas, minutos, etc.)

Formatação de resultados - Oferece diferentes formatos de saída (curto, longo)
Humanização - Apresenta resultados de forma amigável em três idiomas
Cálculos adicionais - Adiciona dias a uma data, verifica anos bissextos e fins de semana

# Como Usar em Diferentes Idiomas:

# Português:
javascript
const comparador = DateComparator.from('2023-01-01');
const resultado = comparador.compare('2023-12-31');
console.log(resultado.format('long')); // Formato longo
console.log(resultado.humanize('pt')); // Formato humanizado

# English:

javascript
const comparator = DateComparator.from('2023-01-01');
const result = comparator.compare('2023-12-31');
console.log(result.format('long')); // Long format
console.log(result.humanize('en')); // Humanized format

# Español:
javascript
const comparador = DateComparator.from('2023-01-01');
const resultado = comparador.compare('2023-12-31');
console.log(resultado.format('long')); // Formato largo
console.log(resultado.humanize('es')); // Formato humanizado

# Métodos Úteis:
DateComparator.addDays(date, days) - Adiciona dias a uma data
DateComparator.isLeapYear(year) - Verifica se um ano é bissexto
DateComparator.diffInDays(date1, date2) - Calcula diferença em dias entre duas datas

A interface permite testar todas as funcionalidades e alternar entre os três idiomas. Você pode copiar o código acima e executá-lo diretamente no navegador.

