const db = require('../models');
const Position = db.positions;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Empty content!"
        });
        return
    }

    const position = {
        title: req.body.title,
        imageSrc: req.body.imageSrc,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    Position.create(position)
        .then(data => {
            res.send(data);
        })
        .catch(e => {
            res.status(500).send({
                message:
                    e.message || "Some error occurred while creating the position."
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Position.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(e => {
            res.status(500).send({
                message:
                    e.message || "Some error occurred while retrieving positions."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Position.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(e => {
            res.status(500).send({
                message: `Error retrieving Position with id=${id}`
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Position.update(req.body, {
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Position was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Position with id=${id}. Maybe Position was not found or req.body is empty!`
            });
        }
        })
        .catch(e => {
        res.status(500).send({
            message: "Error updating Position with id=" + id
        });
    });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Position.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Position was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Position with id=${id}. Maybe Position was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: `Could not delete Posoition with id=${id}`
        });
        });
};

exports.deleteAll = (req, res) => {
    Position.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Position were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all positions."
        });
    });
};

exports.findAllPublished = (req, res) => {
    Position.findAll({ where: { published: true } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving positions."
        });
    });
};