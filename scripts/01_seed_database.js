/**
 * SCRIPT 01: SEED DATABASE
 * Descrição: Configuração inicial e inserção de dados com relacionamentos.
 */

// [Item 1] USE: Seleciona o banco de dados
use esports_db;

// Limpeza inicial (Garante idempotência do script)
db.teams.drop();
db.matches.drop();
db.partidas.drop(); // Esse drop é pra podermos rodar vários teste a vontade, devido a renomeação em scripts/03_maintenance_legacy.js

print(">>> Iniciando Inserção de Dados...");

// --- INSERÇÃO DE TIMES (TEAMS) ---
// [Item 26] SAVE (InsertOne): Usado para inserir e capturar o ID gerado

var loudID = db.teams.insertOne({
    "nome": "LOUD",
    "tag": "LLL",
    "regiao": "Americas",
    "pais": "Brasil",
    "jogo": "Valorant",
    "fundacao": 2019,
    "titulos": ["Champions 2022", "VCT Americas 2023"],
    "jogadores": [
      { "nick": "aspas", "nome": "Erick Santos", "funcao": "Duelista", "idade": 20, "stats": { "kda": 1.45, "hs_rate": 28 } },
      { "nick": "Less", "nome": "Felipe Basso", "funcao": "Sentinela", "idade": 19, "stats": { "kda": 1.30, "hs_rate": 32 } },
      { "nick": "Saadhak", "nome": "Matias Delipetro", "funcao": "IGL", "idade": 26, "stats": { "kda": 1.05, "hs_rate": 22 } },
      { "nick": "tuyz", "nome": "Arthur Andrade", "funcao": "Controlador", "idade": 20, "stats": { "kda": 1.10, "hs_rate": 25 } },
      { "nick": "cauanzin", "nome": "Cauan Pereira", "funcao": "Iniciador", "idade": 18, "stats": { "kda": 1.15, "hs_rate": 26 } }
    ]
}).insertedId;

var fnaticID = db.teams.insertOne({
    "nome": "FNATIC",
    "tag": "FNC",
    "regiao": "EMEA",
    "pais": "Reino Unido",
    "jogo": "Valorant",
    "fundacao": 2004,
    "titulos": ["Lock In 2023", "Masters Tokyo 2023"],
    "jogadores": [
      { "nick": "Boaster", "nome": "Jake Howlett", "funcao": "IGL", "idade": 28, "stats": { "kda": 0.95, "hs_rate": 20 } },
      { "nick": "Derke", "nome": "Nikita Sirmitev", "funcao": "Duelista", "idade": 21, "stats": { "kda": 1.35, "hs_rate": 30 } },
      { "nick": "Alfajer", "nome": "Emir Beder", "funcao": "Sentinela", "idade": 18, "stats": { "kda": 1.25, "hs_rate": 35 } },
      { "nick": "Leo", "nome": "Leo Jannesson", "funcao": "Iniciador", "idade": 19, "stats": { "kda": 1.40, "hs_rate": 24 } },
      { "nick": "Chronicle", "nome": "Timofey Khromov", "funcao": "Flex", "idade": 21, "stats": { "kda": 1.20, "hs_rate": 29 } }
    ]
}).insertedId;

var prxID = db.teams.insertOne({
     "nome": "Paper Rex",
     "tag": "PRX",
     "regiao": "Pacific",
     "pais": "Singapura",
     "jogo": "Valorant",
     "fundacao": 2020,
     "titulos": ["Pacific League 2023"],
     "jogadores": [
       { "nick": "f0rsakeN", "nome": "Jason Susanto", "funcao": "Flex", "idade": 19, "stats": { "kda": 1.28, "hs_rate": 31 } },
       { "nick": "Jinggg", "nome": "Wang Jing Jie", "funcao": "Duelista", "idade": 20, "stats": { "kda": 1.32, "hs_rate": 27 } }
     ]
}).insertedId;

// --- INSERÇÃO DE PARTIDAS (MATCHES) ---
// Utilizando os IDs capturados acima para criar referências consistentes

db.matches.insertMany([
  {
    "evento": "VCT Lock In 2023",
    "fase": "Final",
    "data": new Date("2023-03-04"),
    "formato": "BO5",
    "times_ids": [loudID, fnaticID], 
    "placar_geral": "2-3",
    "vencedor_id": fnaticID, 
    "mapas": [
        { "nome": "Ascent", "vencedor_id": loudID, "placar": "13-8" },
        { "nome": "Fracture", "vencedor_id": loudID, "placar": "13-7" },
        { "nome": "Icebox", "vencedor_id": fnaticID, "placar": "11-13" }
    ],
    "viewers_pico": 1400000,
    "status": "finalizada"
  },
  {
    "evento": "Champions 2023",
    "fase": "Grupos",
    "data": new Date("2023-08-10"),
    "formato": "BO3",
    "times_ids": [loudID, prxID],
    "placar_geral": "2-1",
    "vencedor_id": loudID, 
    "mapas": [
        { "nome": "Lotus", "vencedor_id": loudID, "placar": "13-10" },
        { "nome": "Pearl", "vencedor_id": prxID, "placar": "10-13" }
    ],
    "viewers_pico": 800000,
    "status": "finalizada"
  }
]);

// [Item 30] FINDONE: Verificação simples de inserção
print("Exemplo de time inserido:");
printjson(db.teams.findOne({ nome: "LOUD" }));