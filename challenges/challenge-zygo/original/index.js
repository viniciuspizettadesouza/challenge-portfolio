const fs = require('fs')
fs.readFile('./livros.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Erro de leitura do arquivo:", err)
        return
    }
    try {
        livros = JSON.parse(jsonString)
    } catch (err) {
        console.log('Erro transformando JSON para string:', err)
    }


    function tituloAscendente(a, b) {
        const livroA = a.Título.toUpperCase();
        const livroB = b.Título.toUpperCase();

        let comparacao = 0;
        if (livroA > livroB) {
            comparacao = 1;
        } else if (livroA < livroB) {
            comparacao = -1;
        }
        return comparacao;
    }

    function tituloDescendente(a, b) {
        const livroA = a.Título.toUpperCase();
        const livroB = b.Título.toUpperCase();

        let comparacao = 0;
        if (livroA < livroB) {
            comparacao = 1;
        } else if (livroA > livroB) {
            comparacao = -1;
        }
        return comparacao;
    }

    function autorAscendente(a, b) {
        const livroA = a.Author.toUpperCase();
        const livroB = b.Author.toUpperCase();

        let comparacao = 0;
        if (livroA > livroB) {
            comparacao = 1;
        } else if (livroA < livroB) {
            comparacao = -1;
        }
        return comparacao;
    }

    function autorDescendente(a, b) {
        const livroA = a.Author.toUpperCase();
        const livroB = b.Author.toUpperCase();

        let comparacao = 0;
        if (livroA < livroB) {
            comparacao = 1;
        } else if (livroA > livroB) {
            comparacao = -1;
        }
        return comparacao;
    }

    function edicaoDescendente(a, b) {
        const livroA = a.Edition;
        const livroB = b.Edition;

        let comparacao = 0;
        if (livroA < livroB) {
            comparacao = 1;
        } else if (livroA > livroB) {
            comparacao = -1;
        }
        return comparacao;
    }

    function retornaID(a) {
        let retorno = ""
        if (a === "TítuloAscendente") {
            for (i = 0; i < livros.length; i++) {
                let valorEsperado = livros[i].id
                retorno += valorEsperado
                if (i < livros.length - 1) {
                    retorno += ", "
                }
            }
            console.log("Título Ascendente; Livros", retorno, '\n')
            return retorno
        }
        if (a === "AutorAscendenteTítuloDescendente") {
            for (i = 0; i < livros.length; i++) {
                let valorEsperado = livros[i].id
                retorno += valorEsperado
                if (i < livros.length - 1) {
                    retorno += ", "
                }
            }
            console.log("Autor Ascendente, Título Descendente; Livros", retorno, '\n')
            return retorno
        }
        if (a === "EdiçãodescendenteAutordescendenteTítuloascendente") {
            for (i = 0; i < livros.length; i++) {
                let valorEsperado = livros[i].id
                retorno += valorEsperado
                if (i < livros.length - 1) {
                    retorno += ", "
                }
            }
            console.log("Edição descendente, Autor descendente, Título ascendente; Livros", retorno, '\n')
            return retorno
        }
        if (a === null) {
            console.log("OrderingException", '\n')
            return retorno
        }
        else {
            console.log("(Vazio)", '\n')
        }
        return
    }

    const regra1 = "TítuloAscendente"
    const regra2 = "AutorAscendenteTítuloDescendente"
    const regra3 = "EdiçãodescendenteAutordescendenteTítuloascendente"

    livros.sort(tituloAscendente);
    retornaID(regra1);

    livros.sort(tituloDescendente);
    livros.sort(autorAscendente);
    retornaID(regra2);

    livros.sort(tituloAscendente);
    livros.sort(autorDescendente);
    livros.sort(edicaoDescendente);
    retornaID(regra3);

    retornaID(null);

    retornaID();

})
