import sha1 from 'sha1';


TurboUtils = {
    generateHash : (string) =>{
        return sha1(string);
    }
}

export default TurboUtils
