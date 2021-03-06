const timeout = 15000;

// série de tests sur la page d'accueil
describe("Tests basiques", () => {
    let page;

    // vérification du chargement de la page d'accueil
    test('home', async () => {
        // charger la page d'accueil
        await page.goto('http://polr.stationmyr.net');
        // attendre que l'élément <body> soit chargé
        await page.waitForSelector('body');
        // récupérer le contenu de l'élément <body>
        const html = await page.$eval('body', e => e.innerHTML);
        // vérifier que dans cet élément Body on trouve "Polr du campus"
        await page.screenshot({path: './tests/img/basic-home.png'});
        expect(html).toContain("Polr - Campus Valence")
    }, timeout);

    // parcours client avec about
    test('home and about', async () => {
        await page.goto('http://polr.stationmyr.net');
        await page.waitForSelector('#navbar li a');
        // click sur le lien "About" de la navigation
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( '#navbar li a' ) )
                .filter( el => el.textContent === 'About' )[0].click();
        });
        // on attent que l'élément ".about-contents" soit chargé
        await page.waitForSelector('.about-contents');
        // on récupère le code HTML
        const html = await page.$eval('.about-contents', e => e.innerHTML);
        // on vérifie qu'il contient la bonne chaîne de caractères
        expect(html).toContain("powered by Polr 2");
    }, timeout);

    // parcours client avec sign up
    test('home and sign up', async () => {
        // charger la page d'accueil
        await page.goto('http://polr.stationmyr.net');
        // attendre que l'élément navbar soit chargé
        await page.waitForSelector('#navbar li a');
        // click sur le lien "sign up" de la navigation
        await page.evaluate( () => {
            Array
                .from(document.querySelectorAll('#navbar li a'))
                .filter(el => el.textContent === 'Sign Up')[0].click();
        });
        // on attent que l'élément "body" soit chargé
        await page.waitForSelector('body');
        // on récupère le contenu de body
        const html = await page.$eval('body', e => e.innerHTML);
        await page.screenshot({path: './tests/img/signup.png'});
        expect(html).toContain("Register")
    }, timeout);

    // parcours client avec sign in
    test('home and sign in', async () => {
        // charger la page d'accueil
        await page.goto('http://polr.stationmyr.net');
        // attendre que l'élément navbar soit chargé
        await page.waitForSelector('#navbar li a');
        // click sur le lien "sign ip" de la navigation
        await page.evaluate( () => {
            Array
                .from(document.querySelectorAll('#navbar li a'))
                .filter(el => el.textContent === 'Sign In')[0].click();
        });
        // on attent que la classe dropdown soit chargée
        await page.waitForSelector('.dropdown');

        const html = await page.$eval('.dropdown-menu', e => e.innerHTML);
        expect(html).toContain("Login")

        await page.screenshot({path: './tests/img/signin.png'});

    }, timeout);


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
