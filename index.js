const util = require("util");

const obterTelefoneAsync = util.promisify(obterTelefone);

function obterUsuario() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      return resolve({
        id: 1,
        nome: "Wedney",
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: "1199002",
      ddd: 11,
    });
  }, 2000);
}

function obterEndereco(idUsuario) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        rua: "dos bobos",
        numero: 0,
      });
    }, 2000);
  });
}

async function main() {
  try {
    console.time("tempo-de-execução: ");
    const usuario = await obterUsuario();
    // const telefone = await obterTelefoneAsync(usuario.id);
    // const endereco = await obterEndereco(usuario.id);
    const response = await Promise.all([
      obterTelefoneAsync(usuario.id),
      obterEndereco(usuario.id),
    ]);
    const telefone = response[0];
    const endereco = response[1];

    console.log("usuario: ", usuario);
    console.log("telefone: ", telefone);
    console.log("endereco: ", endereco);

    console.timeEnd("tempo-de-execução: ");
  } catch (erro) {
    console.log("O erro foi: ", erro);
  }
}
main();

//PARA RESOLVER COM PROMISSES
// const promessaDeUsuario = obterUsuario();
// promessaDeUsuario
//   .then((response) => {
//     return obterEndereco(response.id).then((resp) => {
//       return {
//         usuario: {
//           nome: response.nome,
//           id: response.id,
//         },
//         endereco: resp,
//       };
//     });
//   })
//   .then((respo) => {
//     const telefone = obterTelefoneAsync(respo.usuario.id);
//     return telefone.then((resp) => {
//       return {
//         usuario: respo.usuario,
//         endereco: respo.endereco,
//         telefone: resp,
//       };
//     });
//   })
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((erro) => {
//     console.log("ERRO:", erro);
//   });

//PARA RESOLVER SÓ COM CALLBACK
// obterUsuario((erro, usuario) => {
//   if (erro) {
//     console.log("ERRO");
//     return;
//   }

//   obterTelefone(usuario.id, function resolverTelefone(erro, telefone) {
//     if (erro) {
//       console.log("ERRO");
//       return;
//     }
//     console.log("telefone", telefone);
//   });

//   obterEndereco(usuario.id, function resolverEndereco(erro, endereco) {
//     if (erro) {
//       console.log("ERRO");
//       return;
//     }
//     console.log("endereco", endereco);
//   });

//   console.log("usuario", usuario);
// })
