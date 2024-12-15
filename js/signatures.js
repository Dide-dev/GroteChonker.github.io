class Organisation {
    name;
    ext_url;
    logo_url;
    logo_shape;

    /**
 * 
 * @param {string} name 
 * @param {URL} ext_url 
 * @param {URL} logo_url 
 * @param {string} logo_shape 
 */
    constructor(name,ext_url,logo_url,logo_shape) {
    this.name = name;
    this.ext_url = ext_url;
    this.logo_url = logo_url;
    this.logo_shape = logo_shape;
    }
}

class Signatures {
    orgs;

    /**
 * 
 * @param {Array<Organisation>} orgs 
 */
    constructor(orgs) {
    this.orgs = orgs;
    }
}

Organisation.prototype.display = function() {
    let orgBlock = document.createElement('a');
    orgBlock.classList.add('signed-by');
    orgBlock.setAttribute('href',this.ext_url);

    let image = document.createElement('img');
    image.classList.add('logo');
    image.setAttribute('src','images/' + this.logo_url);

    switch (this.logo_shape) {
    case 'round':
    image.classList.add('round');
    break;
    
    case 'rounded-square':
    image.classList.add('rounded-square');
    break;
    
    default:
    break;
    }
    
    orgBlock.appendChild(image);

    let name = document.createElement('h3');
    name.appendChild(document.createTextNode(this.name));

    orgBlock.appendChild(name);

    return orgBlock;
}

Signatures.prototype.display = function() {
    let signaturesArticle = document.getElementById('signatures');

    for (let org of this.orgs) {
    signaturesArticle.appendChild(org.display());
    }
}

function showSignatures() {
    var orgs = JSON.parse(json);
    var signatureOrgs = [];
    for (let org of orgs) {
    signatureOrgs.push(new Organisation(org.name,org.ext_url,org.logo_url,org.logo_shape));
    }
    let signatures = new Signatures(signatureOrgs);
    signatures.display();
}

function loadPage() {
    showSignatures();
}

window.addEventListener("load", loadPage, false);

const json = '[{"name": "ROOD, socialistische jongeren","ext_url": "https://roodjongeren.nl/","logo_url": "rood-logo.png","logo_shape": "rounded-square"},{"name": "De Socialisten","ext_url": "https://socialisten.org/","logo_url": "de_socialisten-logo.png","logo_shape": "rounded-square"},{"name": "Utrecht for Palestine","ext_url": "https://www.instagram.com/utrecht4palestine/","logo_url": "utrecht_4_palestine-logo.png","logo_shape": "rounded-square"},{"name": "Links in het Nieuws","ext_url": "https://www.instagram.com/linksinhetnieuws/","logo_url": "links_in_het_nieuws-logo.png","logo_shape": "round"},{"name": "Communistisch Comité van Nederland","ext_url": "https://communistischcomitenederland.wordpress.com/","logo_url": "communistisch_comite-logo.png","logo_shape": "rounded-square"},{"name": "Meld Islamofobie","ext_url": "https://www.meldislamofobie.org/","logo_url": "meld_islamofobie-logo.png","logo_shape": "rounded-square"},{"name": "Enschede students for Palestine","ext_url": "https://www.instagram.com/enschedestudentsforpalestine/","logo_url": "enschede_students_for_palestine-logo.png","logo_shape": "rounded-square"},{"name": "Breda Solidair","ext_url": "https://www.instagram.com/bredasolidair/","logo_url": "breda_solidair-logo.png","logo_shape": "rounded-square"},{"name": "The Hague for Palestine","ext_url": "https://www.instagram.com/thehague.for.palestine/","logo_url": "the_hague_for_palestine-logo.png","logo_shape": "rounded-square"},{"name": "Kakelverse memes","ext_url": "https://www.instagram.com/kakelversememes/","logo_url": "kakelversememes-logo.png","logo_shape": "round"}]'