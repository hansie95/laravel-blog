export default function ApplicationLogo({ white }) {
    const logoPath = `captain_${white ? "white" : "black"}.png`;
    return <img className="w-24" src={logoPath} />;
}
