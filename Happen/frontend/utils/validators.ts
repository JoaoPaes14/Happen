
export const validarEmail = (email: string): boolean => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };
  
  //
  export const validarSenha = (senha: string): boolean => {

    return senha.length >= 6;
  };
  