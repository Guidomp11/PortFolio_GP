module.exports = (sequelize, DataTypes) => {
    let alias = 'Sustentabilidad'
    let cols = {
        id : {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        unique: true
        },
        nombre : {
            type: DataTypes.STRING(150)
        }
    }
    let config = {
        tableName:'sustentabilidad',
        timestamps: false
    }
    const Sustentabilidad = sequelize.define(alias, cols, config)
    
    Sustentabilidad.associate = function(models){
        Sustentabilidad.belongsToMany(models.Producto, {
            as: 'productos',
            through: 'productos_sustentabilidad',
            foreignKey: 'id_sustentabilidad',
            otherKey: 'id_producto'
        })
    }


    return Sustentabilidad;
}