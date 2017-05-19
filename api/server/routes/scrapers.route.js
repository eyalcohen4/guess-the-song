import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import scrapersCtrl from '../controllers/scrapers.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/saveSong').post(validate(paramValidation.song), scrapersCtrl.saveSong);

export default router;
