import { useEffect } from 'react';

// Data objects for maintainability
const technicalSkills = {
    Frontend: ['JavaScript', 'React', 'TypeScript', 'Next.js'],
    Backend: ['Node.js', 'Python', 'Rust', 'Express'],
    Database: ['MongoDB', 'Prisma'],
    'DevOps & Tools': ['Git', 'GitHub', 'Docker', 'Bun', 'NPM'],
    Deployment: ['Netlify', 'Docusaurus'],
    Monitoring: ['Grafana', 'Prometheus', 'Loki', 'Tempo'],
};

const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/qwertuhh' },
    { name: 'X (Twitter)', url: 'https://twitter.com/qwertuhh132407' },
    { name: 'Discord', url: 'https://discordapp.com/users/qwertuhh.dev' },
    { name: 'Medium', url: 'https://medium.com/@arihantjain132407' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/arihantjain-qwertuhh' },
    { name: 'NPM', url: 'https://npmjs.com/~qwertuhh' },
    { name: 'Email', url: 'mailto:arihantjain132407@gmail.com' },
];

const projects = [
    {
        title: 'Backend Development',
        type: 'Learning Project',
        description:
            'First introduction to backend systems, learning about API development, database management, and server-side logic.',
        skills: ['Node.js', 'Express', 'MongoDB'],
    },
    {
        title: 'Welltrack - Web Application',
        type: 'Hackathon Project',
        description:
            'Web app developed for a hackathon pitch, designed to help users record daily entries, track habits, and monitor their mood.',
        skills: ['AI', 'Web Development'],
    },
];

function StaticPage() {
    const experienceYear = new Date().getFullYear() - 2022;
    useEffect(() => {
        document.title = 'Qwertuhh Portfolio | Static Page';
    }, []);
    return (
        <>
            {/* { ? To overload cursor.css ? } */}
            <style>{`
                * {
                    cursor: auto !important;
                }
                a, button, [role="button"], .cursor-pointer {
                    cursor: pointer !important;
                }
            `}</style>
            <div className="max-w-4xl mx-auto p-8 prose prose-lg jetbrains-mono-regular">
                <header className="mb-12 funnel-display-regular">
                    <h1 className="text-4xl font-bold mb-4">Arihant Jain</h1>
                    <p className="text-md text-gray-600 mb-2">
                        Also known as <strong>Qwertuhh</strong>
                    </p>
                    <p className="text-lg">
                        <strong>
                            &gt;_
                            <del className="text-neutral-950">
                                Developer
                            </del>{' '}
                            --&gt;{' '}
                            <span className="text-base font-semibold px-2 cascadia-code-regular border-2 border-neutral-950">
                                Problem Solver
                            </span>
                        </strong>
                    </p>
                    <div className="border-2 border-neutral-950 my-6 p-[2px]">
                        <p className="text-[0.85em] p-2 bg-neutral-900 text-white cascadia-code-regular">
                            This page has been created to serve to those user
                            how only want to read about me and my projects.
                        </p>
                    </div>
                </header>

                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 border-b  border-gray-300 pb-2">
                        About Me
                    </h2>
                    <p className="mb-4 leading-relaxed">
                        An enthusiastic learner who is greatly interested in
                        programming and Applied Artificial Intelligence. With a
                        strong programming background, I bring passion and
                        dedication to every project I undertake.
                    </p>
                    <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-700 my-6">
                        "Any sufficiently advanced technology is
                        indistinguishable from magic"
                    </blockquote>
                    <p className="leading-relaxed">
                        I love solving problems. Programming feels like my
                        superpower. I chose this path because it gives meaning
                        to my life. I can't solve everyone's problems, but I
                        always try my best—and that effort matters. Through my
                        work, I find stability, purpose, and happiness. When I
                        solve problems for others, I feel connected to them, and
                        in that connection, I feel connected to life itself.
                    </p>
                    <p className="border-l-4 border-gray-400 pl-4 italic text-gray-700 my-6">
                        The satisfaction of solving a problem is the true reward
                        of programming. Programs must be written for people to
                        read, and only incidentally for machines to execute.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-6 border-b border-gray-300 pb-2">
                        Technical Skills
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(technicalSkills).map(
                            ([category, skills]) => (
                                <div
                                    key={category}
                                    className="border-2 border-neutral-950 p-4 "
                                >
                                    <h3 className="font-semibold mb-3 text-lg">
                                        {category}
                                    </h3>
                                    <ul className="space-y-1">
                                        {skills.map((skill) => (
                                            <li key={skill}>
                                                <strong>{skill}</strong>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        )}
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-6 border-b border-gray-300 pb-2">
                        Experience
                    </h2>
                    <div className="mb-6">
                        <p className=" mb-2">
                            <span className="font-bold">
                                {experienceYear}+ years
                            </span>{' '}
                            of software development experience
                        </p>
                        <p className="">
                            Started learning software development in 2022,
                            continuously growing and expanding my skills in the
                            field.
                        </p>
                    </div>

                    <h3 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">
                        Projects
                    </h3>
                    <div className="space-y-8">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="border-l-4 border-neutral-950 pl-6"
                            >
                                <div className="flex items-center mb-2">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {project.title}
                                    </h3>
                                    <span className="ml-auto text-neutral-950 italic">
                                        {project.type}
                                    </span>
                                </div>
                                <p className="mb-4 text-gray-900">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="text-neutral-950 border border-neutral-950 px-3 py-1 text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-6 border-b border-gray-300 pb-2">
                        Connect With Me
                    </h2>
                    <ul className="space-y-2 mb-4">
                        {socialLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-700 hover:text-gray-900 underline"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <p className="text-gray-600 mb-4 italic">
                        Feel free to reach out through any of these platforms!
                    </p>
                </section>
                <section className="mb-6 border-t border-gray-300 mt-2 pt-12">
                    <div className="flex flex-col sm:flex-row gap-4 cursor-pointer">
                        <a
                            href="https://qwertuhh-classic.netlify.app"
                            className="bg-neutral-900 text-white px-6 py-3 text-center"
                        >
                            Visit My Classic Website
                        </a>
                        <a
                            href="https://qwertuhh.netlify.app"
                            className="bg-neutral-900 text-white px-6 py-3 text-center"
                        >
                            Visit My latest Website
                        </a>
                    </div>
                </section>
                <footer className="border-t pt-8 mt-12 text-center text-black">
                    <p>&copy; 2026 Arihant Jain (Qwertuhh)</p>
                    <p className="text-sm mt-2">
                        Distributed under the MIT License. THE SOFTWARE IS
                        PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
                    </p>
                </footer>
            </div>
        </>
    );
}

export default StaticPage;
