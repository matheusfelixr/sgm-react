
export function maskCpfOrCnpj(cpfOrCnpj) {

    if (cpfOrCnpj.length == 11) {

        return cpfOrCnpj
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    }
    if (cpfOrCnpj.length == 14) {
        return cpfOrCnpj
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    }

}

export function maskPhone(phone) {

    const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;
    var str = phone.replace(/[^0-9]/g, "").slice(0, 11);
  
    const result = str.replace(regex, "($1)$2-$3");
  
    return result;
}

