import Header from "@/components/Header";
import Hero from "./components/Hero";
import ContentSection from "@/components/ContentSection";
import { themes } from "@/config";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { FaAdversal, FaAmilia, FaSatellite } from "react-icons/fa";

const App = () => {
  const { setSelectedTheme } = useGlobalContext();
  /**
   * Main Application Component
   *
   * @description
   * This is the entry point for the visual structure of the landing page/application.
   * It composes several sections using the reusable `ContentSection` component.
   *
   * Structure:
   * 1. Header: Navigation and Theme selector.
   * 2. Main: Container for all landing page sections.
   *    - Hero: Initial impact section.
   *    - Transparencia Total: Benefits for early adopters.
   *    - ¿Por qué elegirnos?: Features grid (Interface, Reports, Universal access, Themes).
   *    - CTA (Prepárate...): Call to action to join.
   *    - Themes Showcase: Preview of available themes.
   *    - Contact: Simple contact information.
   */
  return (
    <>
      <Header />
      <main className="w-full min-h-screen overflow-x-hidden">
        {/* Hero Section: Main introduction and value proposition */}
        <Hero />

        {/* Transparencia Total: Information about pricing and free features for early adopters */}
        <ContentSection
          bgColor="bg-black/80"
          title="Transparencia Total"
          actions={
            <button
              type="button"
              className="bg-amber-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-amber-600 transition-colors cursor-pointer font-bold"
            >
              Registrame
            </button>
          }
        >
          <div className="flex flex-col gap-4 text-center items-center">
            <h3 className="text-2xl font-bold text-gray-800">Early Adopter</h3>
            <p className="text-gray-600 max-w-2xl">
              Regístrate ahora con tu email y disfruta de la WebApp GRATIS para siempre respecto a
              las funcionalidades actuales.
            </p>
            <ul className="text-left list-disc list-inside text-gray-700 space-y-2 bg-gray-50 p-6 rounded-lg w-full max-w-lg shadow-inner">
              <li>Registro ilimitado de horas</li>
              <li>Exportación a Excel/PDF</li>
              <li>Acceso a todos los Temas</li>
              <li>Sin pagos futuros por uso actual</li>
            </ul>
            <p className="text-xs text-gray-400 italic mt-2 max-w-2xl">
              * En el futuro, introduciremos funcionalidades Premium avanzadas que tendrán coste,
              pero tu cuenta actual y sus funciones seguirán siendo gratuitas.
            </p>
          </div>
        </ContentSection>

        {/* Why Choose Us: Feature grid highlighting key advantages */}
        <ContentSection
          bgColor="bg-black/80"
          title="¿Por qué elegirnos?"
          cardClassName="max-w-7xl"
          actions={
            <button className="bg-blue-400 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-500 transition-colors cursor-pointer font-bold">
              Descubre Más
            </button>
          }
        >
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full p-4">
            <li className="flex flex-col items-center text-center gap-4">
              <FaSatellite size={40} className="text-theme-color" />
              <h3 className="text-xl font-bold">Interfaz Intuitiva</h3>
              <p className="text-gray-600">
                Navega fácilmente por nuestra plataforma con un diseño limpio y accesible.
              </p>
            </li>
            <li className="flex flex-col items-center text-center gap-4">
              <FaAdversal size={40} className="text-theme-color" />
              <h3 className="text-xl font-bold">Reportes al Instante</h3>
              <p className="text-gray-600">
                Genera reportes instantáneos y detallados para un mejor control.
              </p>
            </li>
            <li className="flex flex-col items-center text-center gap-4">
              <FaSatellite size={40} className="text-theme-color" />
              <h3 className="text-xl font-bold">Universal</h3>
              <p className="text-gray-600">
                Funciona como una app nativa en tu móvil, tablet o escritorio. Instálala como PWA y
                úsala sin conexión.
              </p>
            </li>
            <li className="flex flex-col items-center text-center gap-4">
              <FaAmilia size={40} className="text-theme-color" />
              <h3 className="text-xl font-bold">10+ Temas Visuales</h3>
              <p className="text-gray-600">
                Desde el modo "Militar" para la batalla diaria hasta el modo "Cómic" para ponerle
                humor al trabajo. Hay un estilo para ti.
              </p>
            </li>
          </ul>
        </ContentSection>

        {/* Call to Action: Encouraging users to start using the app */}
        <ContentSection
          bgColor="bg-black/80"
          title="Prepárate para transformar tu gestión de horas"
          actions={
            <button className="bg-amber-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-amber-600 transition-colors cursor-pointer font-bold">
              Comienza Ahora
            </button>
          }
        >
          <p className="text-center text-xl md:text-2xl text-gray-700 max-w-4xl">
            Únete a nuestra comunidad de profesionales que ya están optimizando su tiempo y
            maximizando sus ingresos con nuestra WebApp. No esperes más para llevar el control total
            de tus horas adicionales con estilo y eficiencia.
            {/* Themes Showcase: Preview of available themes to engage users visually */}
          </p>
        </ContentSection>
        <ContentSection
          title="Dale color a tu rutina"
          actions={
            <div className="flex flex-wrap justify-center gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme)}
                  className="bg-white border-2 border-gray-800 hover:bg-gray-100 text-gray-900 font-bold py-2 px-4 rounded shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer flex items-center gap-2"
                >
                  <theme.icon className={theme.color} />
                  {theme.name}
                </button>
              ))}
            </div>
          }
        >
          <p className="text-center text-xl text-gray-700 mb-6">
            Explora nuestra colección de temas. Porque trabajar no tiene por qué ser gris.
            {/* Contact Section: Support information */}
          </p>
        </ContentSection>
        <ContentSection title="Contacto">
          <p className="text-center text-lg text-gray-700">
            ¿Tienes preguntas, sugerencias o necesitas ayuda? Nuestro equipo está aquí para ti.
            Contáctanos en{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-500 hover:underline font-bold"
            >
              support@example.com
            </a>
          </p>
        </ContentSection>
      </main>
    </>
  );
};

export default App;
