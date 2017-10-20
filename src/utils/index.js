import sha1 from '../../node_modules/sha1/sha1';


TurboUtils = {
    generateHash : (string) =>{
        return sha1(string);
    }
}

export default TurboUtils
