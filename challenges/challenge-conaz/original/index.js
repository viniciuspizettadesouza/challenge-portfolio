let teste = "teste conaz"
let teste2 = 'aaaaabbbbccccccaaaaaaa'

function desafio1_1(teste) {
   let array = teste.split('').sort()

   const obj = {}

   for (const key of array) {
      obj[key] = array.filter(parametro =>
         key === parametro).length
   }
   console.log(obj)
}

function desafio1_2(teste2) {
   let currentletter = teste2[0]
   let count = 0
   let ret = ''
   for (let letter of teste2) {
      if (letter != currentletter) {
         ret += count + currentletter
         currentletter = letter
         count = 1
      } else {
         count++
      }
   }
   ret += count + currentletter
   console.log(ret)
}

function desafio2() {
   let carteiras = [
      {
         'numero': 1,
         'ativo': true,
         'bilhete': 10,
      },
      {
         'numero': 2,
         'ativo': false,
         'bilhete': 0,
      },
      {
         'numero': 3,
         'ativo': true,
         'bilhete': 12,
      },
      {
         'numero': 4,
         'ativo': false,
         'bilhete': 0,
      },
      {
         'numero': 5,
         'ativo': true,
         'bilhete': 14,
      },
      {
         'numero': 6,
         'ativo': true,
         'bilhete': 15,
      },
   ]

   let atualiza_socio = function (lista_socios) {
      for (let registro of carteiras) {
         let desatualizar = false
         for (const socio of lista_socios) {
            if (registro.numero == socio.numero) {
               socio.ativo = true
               socio.bilhete = registro.bilhete
               atualizou = true
               desatualizar = false
               socio.atualizado = true
            }
         }
         if (desatualizar) {
            registro.ativo = false
         }
      }

      for (socio of lista_socios) {
         if (!socio.hasOwnProperty('atualizado')) {
            carteiras.push({
               numero: socio.numero,
               ativo: true,
               bilhete: socio.bilhete
            })
         }
      }

   }

   let lista_socios_teste = [
      { numero: 1, bilhete: 16 },
      { numero: 3, bilhete: 13 },
      { numero: 5, bilhete: 15 },
      { numero: 8, bilhete: 10 },
      { numero: 9, bilhete: 19 },
   ]

   atualiza_socio(lista_socios_teste)

   console.log(carteiras)
}

desafio1_1(teste)
desafio1_2(teste2)
desafio2()