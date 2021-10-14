import express from 'express';

const router = express.Router();

// apparently in here you ave to use router.route...... which is retarded.
router.route('/').get((req, res)=>{
	res.send('hello world!');
});

export default router;