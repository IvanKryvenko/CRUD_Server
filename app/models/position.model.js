module.exports = (sequelize, Sequelize) => {
    const Position = sequelize.define('position', {
        title: {
            type: Sequelize.STRING
        },
        imageSrc: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Position;
}