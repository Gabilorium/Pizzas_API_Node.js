class Usuario{
    Id;
    Nombre;  
    UserNAme;
    Apellido;
    Password;
    Token;
    TokenExpiration;
    constructor(Id, Nombre, UserNAme, Apellido, Password, Token, TokenExpiration ) {
        this.Id                 = Id;
        this.Nombre             = Nombre;
        this.UserNAme           = UserNAme;
        this.Apellido           = Apellido;
        this.Password           = Password;
        this.Token              = Token;
        this.TokenExpiration    =TokenExpiration;
    }
}