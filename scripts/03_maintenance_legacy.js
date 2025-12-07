/**
 * SCRIPT 03: MANUTENÇÃO E LEGADO
 * Descrição: Updates, MapReduce e funções JS.
 */

use esports_db;

print(">>> 1. Atualizações de Dados");

// [Item 31] ADDTOSET: Adicionando título sem duplicar.
// [Item 25] UPDATE (UpdateOne): Modificando documento.
db.teams.updateOne(
  { nome: "LOUD" }, 
  { $addToSet: { titulos: "VCT Kickoff 2024" } }
);

// [Item 21] SET: Atualizando valor específico.
// [Item 24] FILTER (ArrayFilters): Atualizando sub-documento específico.
db.teams.updateOne(
  { nome: "LOUD" },
  { $set: { "jogadores.$[elem].stats.kda": 1.55 } },
  { arrayFilters: [ { "elem.nick": "aspas" } ] }
);

print(">>> 2. Consultas Específicas");

// [Item 20] ALL: Times que possuem exatamente ambos os títulos.
db.teams.find({ titulos: { $all: ["Champions 2022", "VCT Americas 2023"] } }).pretty();

// [Item 16] $WHERE: Busca legada via JavaScript (Fundados antes de 2010).
db.teams.find({ $where: "this.fundacao < 2010" });


print(">>> 3. MapReduce (Jogadores por Região)");
// [Item 17] MAPREDUCE e [Item 18] FUNCTION  

var mapFunction = function() {
   // Emite a Região como chave e o tamanho do array de jogadores como valor
   emit(this.regiao, this.jogadores.length);
};

var reduceFunction = function(keyRegiao, valuesQtd) {
   // [Item 9] SUM: Soma a quantidade de jogadores 
   return Array.sum(valuesQtd);
};

db.teams.mapReduce(
   mapFunction,
   reduceFunction,
   { out: "relatorio_jogadores_por_regiao" }
);

print("Resultado do MapReduce:");
db.relatorio_jogadores_por_regiao.find().pretty();


print(">>> 4. Finalização e Auditoria");

// [Item 27] RENAMECOLLECTION: Refatoração de nome de coleção 
// Verificando se existe antes para não dar erro em execução
if (db.getCollectionNames().includes("matches")) {
    db.matches.renameCollection("partidas");
}

// [Item 10] COUNT (CountDocuments): Contagem final
print("Total de Times cadastrados: " + db.teams.countDocuments());
print("Total de Partidas cadastradas: " + db.partidas.countDocuments());