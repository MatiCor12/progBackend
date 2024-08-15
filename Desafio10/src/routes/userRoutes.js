import express from 'express';
import passport from 'passport';
import { registerUser, loginUser, logoutUser, getCurrentSession, isAuthenticated, sendPasswordResetEmail, resetPassword, renderChangeRole, changeRole } from '../controllers/users.js';

const router = express.Router();

router.get('/forgot-password', (req, res) => {
    res.render('forgot-password');
});
router.get('/reset-password/:token', (req, res) => {
    const { token } = req.params;
    res.render('reset-password', { token });
});
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/current', isAuthenticated, getCurrentSession);
router.get('/change-role', isAuthenticated, renderChangeRole);
router.post('/change-role/:uid', isAuthenticated, changeRole);
router.post('/forgot-password', sendPasswordResetEmail);
router.post('/reset-password/:token', resetPassword);
router.get("/github", passport.authenticate("github", { scope: 'user:email' }), (req, res) => {});
router.get("/githubcallback", passport.authenticate("github", { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

export default router;