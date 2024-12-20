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

    let name = document.createElement('strong');
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
    fetch('data/orgs.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(orgs => {
        var signatureOrgs = [];
        for (let org of orgs) {
        signatureOrgs.push(new Organisation(org.name,org.ext_url,org.logo_url,org.logo_shape));
        }
        let signatures = new Signatures(signatureOrgs);
        signatures.display();
      })
      .catch(error => {
        console.error('Error fetching JSON:', error);
      });
}

function loadPage() {
    showSignatures();
}

window.addEventListener("load", loadPage, false);