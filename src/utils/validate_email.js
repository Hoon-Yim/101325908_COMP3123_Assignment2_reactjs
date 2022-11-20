export default function ValidateEmail(email) {
    // var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validRegex = /^\S+@\S+\.\S+$/;

    if (email.match(validRegex)) return true; 
    else return false;
}