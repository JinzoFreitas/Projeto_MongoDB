/**
 * SCRIPT 02: QUERIES & ANALYTICS
 * Descrição: Consultas de seleção, filtros e agregações avançadas.
 */

use esports_db;

print(">>> 1. Relatório: Dream Team (Melhores por Função)");
// [Item 4] AGGREGATE: Início do pipeline
db.teams.aggregate([
    { $unwind: "$jogadores" },
    
    // [Item 5] MATCH: Filtrando apenas quem tem função definida
    // [Item 13] EXISTS: Verificação de existência de campo
    { $match: { "jogadores.funcao": { $exists: true } } },
    
    // [Item 14] SORT: Ordenando pelo KDA para garantir que o $first pegue o maior
    { $sort: { "jogadores.stats.kda": -1 } },
    
    // [Item 8] GROUP: Agrupando por Role
    { 
        $group: {
            _id: "$jogadores.funcao",
            melhorJogador: { $first: "$jogadores.nick" },
            // [Item 11] MAX: Obtido implicitamente via Sort + First (ou usando $max aqui)
            kda: { $first: "$jogadores.stats.kda" },
            time: { $first: "$nome" },
            // [Item 12] AVG: Calculando a média de HS Rate daquela função
            mediaHsRate: { $avg: "$jogadores.stats.hs_rate" }
        }
    },
    
    // [Item 6] PROJECT: Formatando a saída
    {
        $project: {
            _id: 0,
            funcao: "$_id",
            jogador: "$melhorJogador",
            kda: 1,
            media_hs: { $round: ["$mediaHsRate", 1] },
            time: 1
        }
    }
    // [Item 19] PRETTY: Formatação no shell
]).pretty();


print(">>> 2. Relatório: Partidas com Detalhes dos Times (Join)");
// [Item 29] LOOKUP: Join entre Matches e Teams
db.matches.aggregate([
  {
    $lookup: {
      from: "teams",
      localField: "times_ids",
      foreignField: "_id",
      as: "detalhes_times"
    }
  },
  {
    $project: {
      evento: 1,
      placar_geral: 1,
      times: "$detalhes_times.nome",
      // [Item 28] COND: Lógica condicional para classificar audiência
      destaque: {
        $cond: { 
            if: { $gte: ["$viewers_pico", 1000000] }, // [Item 7] GTE
            then: "Super Popular", 
            else: "Audiência Normal" 
        }
      }
    }
  },
  // [Item 15] LIMIT: Trazendo apenas os 2 resultados mais recentes
  { $limit: 2 }
]).pretty();


print(">>> 3. Busca Textual");
// [Item 22] TEXT: Criando índice
db.teams.createIndex({ nome: "text", tag: "text", "jogadores.nick": "text" });

// [Item 23] SEARCH: Buscando string específica
print("Buscando por 'aspas' ou 'FNC':");
db.teams.find({ $text: { $search: "FNC aspas" } }).pretty();

print(">>> 4. Busca por Tamanho de Array");
// [Item 3] SIZE: Times que não têm elenco completo (menos de 5 jogadores)
db.teams.find({ "jogadores": { $not: { $size: 5 } } });