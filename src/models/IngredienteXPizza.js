class IngredienteXPizza{
    Id;
    IdPizza;
    IdIngrediente;
    IdUnidad;  
    Cantidad;
    constructor(Id,IdPizza, IdIngrediente, IdUnidad, Cantidad) {
        this.Id            = Id;
        this.IdPizza       = IdPizza;
        this.IdIngrediente = IdIngrediente;
        this.IdUnidad      = IdUnidad;
        this.Cantidad      = Cantidad;
    }
}


export default IngredienteXPizza