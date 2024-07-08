// src/Footer.js
import React, { useState } from 'react';
import Modal from './Modal';
import mLogo from './moderat.png';
import sLogo from './s.png';
import sdLogo from './sd.png';
import mpLogo from './mp.png';
import lLogo from './l.png';
import vLogo from './v.png';
import cLogo from './c.png';
import kLogo from './kd.png';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const privacyPolicy = `
Integritetspolicy
Introduktion
Vi värnar om din integritet och strävar efter att skydda dina personuppgifter. Denna integritetspolicy förklarar hur vi samlar in, använder, och skyddar din information när du använder vår webbplats. Genom att besöka och använda vår webbplats godkänner du de metoder som beskrivs i denna policy.

Insamling av information
Vi kan samla in och behandla följande typer av personuppgifter om dig:

Kontaktinformation: Namn, e-postadress och telefonnummer.
Teknisk information: IP-adress, webbläsartyp, och version, tidszoninställning, webbläsarinställningar, operativsystem och plattform.
Användningsinformation: Information om hur du använder vår webbplats, inklusive de tjänster du tittar på eller söker efter.
Användning av information
Vi använder den information vi samlar in för att:

Tillhandahålla, driva och underhålla vår webbplats.
Förbättra din användarupplevelse på webbplatsen.
Kontakta dig med nyhetsbrev, marknadsförings- eller reklamaterial och annan information som kan vara av intresse för dig.
Förstå och analysera hur du använder vår webbplats.
Delning av information
Vi delar inte dina personuppgifter med tredje parter förutom i följande fall:

Med tjänsteleverantörer som hjälper oss att driva vår webbplats eller bedriva vår verksamhet.
När vi är skyldiga att göra det enligt lag eller för att svara på rättsliga processer.
För att skydda och försvara våra rättigheter eller egendom.
Lagring av information
Vi lagrar dina personuppgifter endast så länge som är nödvändigt för de syften som anges i denna integritetspolicy. Vi kommer att behålla och använda dina personuppgifter i den utsträckning det är nödvändigt för att följa våra juridiska skyldigheter, lösa tvister och upprätthålla våra avtal och policyer.

Dina rättigheter
Du har rätt att:

Begära tillgång till de personuppgifter vi har om dig.
Begära att vi rättar felaktiga eller ofullständiga personuppgifter.
Begära att vi raderar dina personuppgifter under vissa omständigheter.
Invända mot behandlingen av dina personuppgifter i vissa fall.
Begära att vi begränsar behandlingen av dina personuppgifter i vissa fall.
Begära att få dina personuppgifter överförda till en annan organisation, där det är tekniskt möjligt.
Cookies
Vi använder cookies och liknande spårningsteknologier för att spåra aktiviteten på vår webbplats och hålla viss information. Cookies är filer med en liten mängd data som kan innehålla en anonym identifierare. Du kan instruera din webbläsare att neka alla cookies eller att indikera när en cookie skickas. Om du inte accepterar cookies kan du dock kanske inte använda vissa delar av vår webbplats.

Ändringar av denna integritetspolicy
Vi kan uppdatera vår integritetspolicy från tid till annan. Vi kommer att meddela dig om eventuella ändringar genom att publicera den nya integritetspolicyn på denna sida. Du uppmanas att regelbundet granska denna integritetspolicy för eventuella ändringar.
  `;

  const termsOfService = `
Användarvillkor
Introduktion
Välkommen till vår webbplats! Dessa användarvillkor beskriver reglerna och föreskrifterna för användningen av vår webbplats. Genom att besöka och använda denna webbplats accepterar du dessa villkor i sin helhet. Använd inte vår webbplats om du inte accepterar alla villkor som anges på denna sida.

Immateriella rättigheter
Om inget annat anges, äger vi och/eller våra licensgivare de immateriella rättigheterna för allt material på webbplatsen. Alla dessa immateriella rättigheter är förbehållna. Du får visa och/eller skriva ut sidor från webbplatsen för ditt eget personliga bruk, med förbehåll för de restriktioner som anges i dessa villkor.

Användning av öppen data
Vi använder och publicerar öppen data från Sveriges riksdag, vilket är tillåtet enligt deras licensvillkor. All data som tillhandahålls på denna webbplats är tillåten att använda enligt de licenser och villkor som tillhandahålls av Sveriges riksdag. Vi förbehåller oss rätten att när som helst uppdatera eller ändra den information som tillhandahålls på webbplatsen.

Acceptabel användning
Du får inte använda vår webbplats på något sätt som orsakar, eller kan orsaka, skada på webbplatsen eller försämring av tillgängligheten eller tillgängligheten av webbplatsen. Du får inte använda webbplatsen på något sätt som är olagligt, bedrägligt eller skadligt, eller i samband med något olagligt, bedrägligt eller skadligt syfte eller verksamhet.

Begränsning av ansvar
Webbplatsen tillhandahålls "i befintligt skick" utan några garantier, uttryckliga eller underförstådda. Vi gör inga utfästelser eller garantier av något slag med avseende på denna webbplats eller den information och material som tillhandahålls på webbplatsen. Vi ansvarar inte för någon form av förlust eller skada som kan uppstå vid användning av webbplatsen eller dess innehåll.

Ändringar av villkoren
Vi förbehåller oss rätten att när som helst ändra dessa användarvillkor. Alla ändringar kommer att publiceras på denna sida och det är ditt ansvar att regelbundet kontrollera dessa villkor för att säkerställa att du är medveten om den senaste versionen.
  `;

  const cookiePolicy = `

Denna cookiepolicy förklarar vad cookies är och hur vi använder dem på vår webbplats. Läs denna policy noggrant för att förstå vilken information vi samlar in via cookies, hur vi använder denna information och hur du kan kontrollera cookieinställningar.

Vad är cookies?
Cookies är små textfiler som placeras på din dator eller mobila enhet när du besöker en webbplats. Cookies används ofta för att webbplatser ska fungera mer effektivt och för att ge ägare av webbplatser viss information.

Hur använder vi cookies?
Vi använder cookies för olika ändamål:

Nödvändiga cookies: Dessa cookies är nödvändiga för att webbplatsen ska fungera och kan inte stängas av i våra system.
Prestandacookies: Dessa cookies samlar in information om hur besökare använder en webbplats, till exempel vilka sidor besökare oftast besöker och om de får felmeddelanden från webbsidor.
Funktionella cookies: Dessa cookies tillåter webbplatsen att komma ihåg val du gör och tillhandahålla förbättrade, mer personliga funktioner.
Marknadsföringscookies: Dessa cookies används för att leverera annonser som är mer relevanta för dig och dina intressen.
Tredjepartscookies
I vissa fall använder vi cookies från betrodda tredje parter. Dessa inkluderar:

Google Analytics: Vi använder Google Analytics för att förstå hur vår webbplats används och för att förbättra din upplevelse. Google Analytics cookies kan spåra saker som hur länge du tillbringar på webbplatsen och vilka sidor du besöker.
Hur kan du kontrollera cookies?
Du kan när som helst justera dina cookieinställningar genom att ändra inställningarna i din webbläsare. Observera att om du stänger av cookies kan vissa funktioner på vår webbplats inte fungera som avsett.

Mer information
För mer information om cookies, besök All About Cookies.

  `;

  const footerStyle = {
    backgroundColor: 'rgba(0,0,0,0.91)',
    color: '#fff',
    padding: '20px 0',
    textAlign: 'center',
    borderRadius: '5px',
    borderTopLeftRadius: "1%",
    borderTopRightRadius: "1%",
    height: "auto",

  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const sectionStyle = {
    flex: '1',
    minWidth: '250px',
    margin: '10px 0',
  };

  const headerStyle = {
    marginBottom: '15px',
    fontSize: '18px',
  };

  const paragraphStyle = {
    fontSize: '17px',
    lineHeight: '1.7',
  };

  const listStyle = {
    listStyle: 'none',
    padding: '0',
  };

  const listItemStyle = {
    margin: '5px 0',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    cursor: 'pointer',
    lineHeight: '1.7',
  };

  const socialLinksStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  const socialLinkItemStyle = {
    margin: '0 10px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '20px',
  };

  const footerBottomStyle = {
    marginTop: '20px',
    fontSize: '14px',
  };

  const partyLinks = [
    { name: 'Moderaterna', logo: mLogo, link: 'https://www.moderaterna.se' },
    { name: 'Socialdemokraterna', logo: sLogo, link: 'https://www.socialdemokraterna.se' },
    { name: 'Sverigedemokraterna', logo: sdLogo, link: 'https://www.sverigedemokraterna.se' },
    { name: 'Miljöpartiet', logo: mpLogo, link: 'https://www.mp.se' },
    { name: 'Liberalerna', logo: lLogo, link: 'https://www.liberalerna.se' },
    { name: 'Vänsterpartiet', logo: vLogo, link: 'https://www.vansterpartiet.se' },
    { name: 'Centerpartiet', logo: cLogo, link: 'https://www.centerpartiet.se' },
    { name: 'Kristdemokraterna', logo: kLogo, link: 'https://www.kristdemokraterna.se' },
  ];

  return (
      <footer style={footerStyle}>
        <div style={containerStyle}>
          <div style={sectionStyle}>
            <h2 style={headerStyle}>Samlad Politik</h2>
            <p style={paragraphStyle}>Länkar till partiernas respektive hemsidor.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {partyLinks.map((party, index) => (
                  <div key={index} style={{ width: '50%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <a href={party.link} style={{ ...linkStyle, display: 'flex', alignItems: 'center' }} target="_blank" rel="noopener noreferrer">
                      {party.name} <img src={party.logo} alt={`${party.name} logo`} style={{ marginLeft: '8px', width: '20px', height: '20px' }} />
                    </a>
                  </div>
              ))}
            </div>
          </div>
          <div style={sectionStyle}>
            <h2 style={headerStyle}>Länkar</h2>
            <ul style={listStyle}>
              <li style={listItemStyle}><span style={linkStyle} onClick={() => openModal('Integritetspolicy', privacyPolicy)}>Integritetspolicy</span></li>
              <li style={listItemStyle}><span style={linkStyle} onClick={() => openModal('Användarvillkor', termsOfService)}>Användarvillkor</span></li>
              <li style={listItemStyle}><span style={linkStyle} onClick={() => openModal('Cookiepolicy', cookiePolicy)}>Cookie Policy</span></li>
              <li style={listItemStyle}><a style={linkStyle} href="www.samladpolitik.se/sitemap">Sitemap</a></li>
            </ul>
          </div>



        </div>
        <div style={footerBottomStyle}>
          &copy; {new Date().getFullYear()} Samlad Politik. Alla rättigheter förbehållna.
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
          <p>{modalContent}</p>
        </Modal>
      </footer>
  );
};

export default Footer;
