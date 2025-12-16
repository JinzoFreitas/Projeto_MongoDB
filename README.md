# 🎮 E-Sports Manager (MongoDB Project)

Projeto desenvolvido para a disciplina de **Banco de Dados** do **CIn-UFPE**.
**Semestre:** 2025.2
**Professora:** Valéria Cesário Times

---

## 📋 Sobre o Projeto
O **E-Sports Manager** é um banco de dados NoSQL orientado a documentos projetado para gerenciar o ecossistema competitivo de **Valorant**. O sistema armazena e relaciona dados complexos sobre:
- **Times:** Organizações, títulos, região e elenco.
- **Jogadores:** Estatísticas individuais (KDA, HS%), funções e dados pessoais.
- **Partidas:** Histórico de confrontos, mapas jogados, placares e audiência.

### 🛠 Tecnologias
- **Banco de Dados:** MongoDB
- **Ferramentas:** MongoDB Compass / Mongosh
- **Linguagem:** JavaScript (Scripts de automação e consulta)

---

## 📂 Estrutura do Repositório

- `/scripts`: Contém os scripts executáveis no Shell do Mongo ou Compass.
    - `01_seed_database.js`: Cria o banco, coleções e insere os dados iniciais com relacionamentos.
    - `02_queries_analytics.js`: Consultas de agregação, filtros complexos e relatórios (Ex: Dream Team).
    - `03_maintenance_legacy.js`: Operações de manutenção, MapReduce e funcionalidades legadas.
- `/docs`: Documentação acadêmica e relatórios.

---

## 📊 Dicionário de Dados (Resumo)

### Collection: `teams`
| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `_id` | ObjectId | Identificador único |
| `nome` | String | Nome da organização |
| `jogadores` | Array | Lista de sub-documentos dos atletas |
| `jogadores.stats` | Object | Estatísticas (KDA, HS%) |

### Collection: `partidas`
| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `evento` | String | Nome do campeonato |
| `times_ids` | Array[ObjectId] | Referência aos times (Lookup) |
| `mapas` | Array | Detalhes de cada mapa jogado |

---

## ✅ Checklist de Funcionalidades (31/31)

Este projeto contempla todos os itens exigidos na especificação:

| Categoria | Itens Implementados |
| :--- | :--- |
| **CRUD Básico** | USE, FIND, SAVE (Insert), UPDATE, REMOVE |
| **Consultas** | GTE, EXISTS, SORT, LIMIT, PRETTY, FINDONE, ALL |
| **Agregação** | AGGREGATE, MATCH, PROJECT, GROUP, UNWIND, LOOKUP |
| **Array/Cond** | SIZE, FILTER, ADDTOSET, COND |
| **Legado/Adv** | MAPREDUCE, FUNCTION, $WHERE, TEXT, SEARCH |
| **Outros** | COUNT, RENAMECOLLECTION, SET |

---

## 🚀 Como Rodar

1. Clone o repositório.
2. Abra o **MongoDB Compass**.
3. Conecte-se ao seu cluster local ou Atlas.
4. Abra o Shell (Mongosh) na parte inferior.
5. Copie e cole o conteúdo de `scripts/01_seed_database.js` para popular o banco.
6. Execute os demais scripts conforme a necessidade de análise.

---
