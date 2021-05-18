const router = require('express').Router();
const { User, Card, Deck } = require('../../models');

//get all decks
router.get('/', async (req, res) => {
  try {
    const deckData = await Deck.findAll({
      attributes: ["deck_name", "user_id"],
      include: [
        {
          model: Card,
          attributes: ["id", "card_name", "description", "card_image", "deck_id", "user_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
       
      ],
    });

    res.status(200).json(deckData);


  } catch (err) {
    res.status(500).json(err)
  }
});

//get one deck by id
router.get('/:id', async (req, res) => {
  try {
    const deckData = await Deck.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["deck_name", "user_id"],
      include: [
       
        {
          model: Card,
          attributes: ["id", "card_name", "description", "card_image", "deck_id", "user_id"],
        },
      ]
    });

    if(!deckData) {
      res.status(404).json({ message: `No Deck with ID of ${req.params.id} found!` });
      return;
    }
    res.status(200).json(deckData);


  } catch (err) {
    res.status(500).json(err)
  }
});





router.post('/', async (res, req) => {
  try {
    const deck = await Deck.create(req.body);
    res.status(200).json(deck);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (res, req) => {
  try {
    const deck = await Deck.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deck);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (res, req) => {
  try {
    const deck = await Deck.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deck);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;