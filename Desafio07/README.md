# 📅 Biblioteca DateComparator

Este é o **Desafio 07** do módulo TechLead da DNC.  
A biblioteca **DateComparator** foi desenvolvida para realizar **comparações avançadas de datas**, com suporte a múltiplos idiomas, diferentes formatos de exibição e cálculos adicionais.

🔗 [Código-fonte no GitHub](https://github.com/DanielEloy/DNC_TechLead/tree/main/Desafio07/introducao_ao_NPM_node_Package_manag)

---

## ✨ Principais Recursos

- 📊 **Comparação de datas** em várias unidades (milissegundos → anos)  
- ⏱️ **Formatação flexível**:
  - Formato curto → `2d 5h`
  - Formato longo → `2 days, 5 hours, 30 minutes`
  - Formato humanizado → `"in 2 months"`  
- 🌍 **Suporte a múltiplos idiomas** (Português, Inglês, Espanhol)  
- 📆 **Funcionalidades extras**:
  - Verificação de fim de semana
  - Detecção de datas passadas/futuras
  - Cálculo preciso de meses e anos
  - Métodos estáticos utilitários

---

## 🛠️ Como Usar

### 📌 Comparar com a data atual
```javascript
DateComparator.from('2025-12-25').compare()
```

#### 📌 Comparar duas datas específicas
```javascript
DateComparator.from('2025-12-25').compare('2026-01-01')
```

##### 📌 Formatando resultados
```javascript
const diff = DateComparator.from('2025-12-25').compare()
console.log(diff.format('short'))   // Ex: "2d 5h"
console.log(diff.humanize('pt'))    // Ex: "em 2 meses"
```

###### 🌍 Uso em Diferentes Idiomas
***🇧🇷 Português***
```javascript
const comparador = DateComparator.from('2023-01-01');
const resultado = comparador.compare('2023-12-31');
console.log(resultado.format('long'));   // "365 dias, 0 horas..."
console.log(resultado.humanize('pt'));   // "em 1 ano"
```

***🇺🇸 English***
```javascript
const comparator = DateComparator.from('2023-01-01');
const result = comparator.compare('2023-12-31');
console.log(result.format('long'));   // "365 days, 0 hours..."
console.log(result.humanize('en'));   // "in 1 year"
```

***🇪🇸 Español***
```javascript
const comparador = DateComparator.from('2023-01-01');
const resultado = comparador.compare('2023-12-31');
console.log(resultado.format('long'));   // "365 días, 0 horas..."
console.log(resultado.humanize('es'));   // "en 1 año"
```

###### 🔧 Métodos Úteis

```javascript
DateComparator.addDays(date, days) → Adiciona dias a uma data
DateComparator.isLeapYear(year) → Verifica se um ano é bissexto
DateComparator.diffInDays(date1, date2) → Calcula diferença em dias entre duas datas
```

###### 🚀 Teste no Navegador

```
A interface da biblioteca permite testar todas as funcionalidades e alternar entre os três idiomas facilmente.
Basta copiar o código acima e executar no console do navegador.
```

###### 📝 Licença
```
Projeto desenvolvido como parte do curso DNC TechLead.
Uso livre para fins educacionais.
```