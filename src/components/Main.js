import React from 'react';
import Card from './Card';
import '../styles/Main.css';

function MainContent() {
  const languages = [
    { 
      name: 'JavaScript', 
      shorty: 'The scripting standard for webpages.', // Add a shorty for each language
      description: 'JavaScript is a popular programming language that is primarily used for building interactive web applications.' 
    },
    { 
      name: 'Python', 
      shorty: 'The language of simplicity and power.', 
      description: 'Python is a versatile and beginner-friendly programming language known for its readability and extensive libraries.' 
    },
    { 
      name: 'C++', 
      shorty: 'The language of systems and games.', 
      description: 'C++ is a high-performance programming language used to build complex systems and video games.' 
    },
    {
        name: 'Java',
        shorty: 'The language of enterprise applications.',
        description: 'Java is a popular programming language used to build large-scale enterprise applications.'
    },
    {
        name: 'Ruby',
        shorty: 'The language of elegance and simplicity.',
        description: 'Ruby is a dynamic programming language known for its simplicity and productivity.'
    },
    {
        name: 'C#',
        shorty: 'The language of Microsoft.',
        description: 'C# is a versatile programming language developed by Microsoft for building Windows applications.'
    },
    {
        name: 'PHP',
        shorty: 'The language of server-side scripting.',
        description: 'PHP is a server-side scripting language used to build dynamic web applications.'
    },
    {
        name: 'Swift',
        shorty: 'The language of Apple.',
        description: 'Swift is a powerful programming language developed by Apple for building iOS and macOS applications.'
    },
    {
        name: 'Kotlin',
        shorty: 'The language of Android.',
        description: 'Kotlin is a modern programming language used to build Android applications.'
    },
    {
        name: 'TypeScript',
        shorty: 'The language of static typing.',
        description: 'TypeScript is a superset of JavaScript that adds static typing to the language.'
    },
    {
        name: 'Go',
        shorty: 'The language of Google.',
        description: 'Go is a statically typed programming language developed by Google for building reliable and efficient software.'
    },
    {
        name: 'Rust',
        shorty: 'The language of performance and safety.',
        description: 'Rust is a systems programming language known for its performance, reliability, and memory safety.'
    },
    {
        name: 'Scala',
        shorty: 'The language of scalability.',
        description: 'Scala is a powerful programming language known for its scalability and functional programming features.'
    },
    {
        name: 'Perl',
        shorty: 'The language of text processing.',
        description: 'Perl is a versatile programming language used for text processing and system administration tasks.'
    },
    {
        name: 'Lua',
        shorty: 'The language of game scripting.',
        description: 'Lua is a lightweight programming language used for game scripting and embedded applications.'
    },
    {
        name: 'Haskell',
        shorty: 'The language of pure functional programming.',
        description: 'Haskell is a purely functional programming language known for its advanced type system and elegance.'
    },
    {
        name: 'R',
        shorty: 'The language of data analysis.',
        description: 'R is a programming language used for statistical computing and data analysis.'
    },
    {
        name: 'Dart',
        shorty: 'The language of Flutter.',
        description: 'Dart is a programming language developed by Google for building mobile, desktop, and web applications.'
    },
    {
        name: 'Julia',
        shorty: 'The language of scientific computing.',
        description: 'Julia is a high-level programming language used for scientific computing and numerical analysis.'
    },
    {
        name: 'Shell',
        shorty: 'The language of the command line.',
        description: 'Shell scripting is a versatile programming language used for automating system administration tasks.'
    },
    {
        name: 'PowerShell',
        shorty: 'The language of Windows PowerShell.',
        description: 'PowerShell is a task automation and configuration management framework from Microsoft.'
    },
    {
        name: 'Objective-C',
        shorty: 'The language of Apple before Swift.',
        description: 'Objective-C is a general-purpose programming language developed by Apple for building iOS and macOS applications.'
    },

    {
        name: 'Visual Basic',
        shorty: 'The language of Visual Basic.',
        description: 'Visual Basic is an event-driven programming language developed by Microsoft for building Windows applications.'
    },
    {
        name: 'COBOL',
        shorty: 'The language of business applications.',
        description: 'COBOL is a high-level programming language used for business applications.'
    },
    {
        name: 'Fortran',
        shorty: 'The language of scientific computing.',
        description: 'Fortran is a general-purpose programming language used for scientific and numeric computations.'
    },
    {
        name: 'Ada',
        shorty: 'The language of the Department of Defense.',
        description: 'Ada is a structured programming language used in aviation, space, and military applications.'
    },
    {
        name: 'Lisp',
        shorty: 'The language of artificial intelligence.',
        description: 'Lisp is a powerful programming language used for artificial intelligence and symbolic computation.'
    },
    {
        name: 'Prolog',
        shorty: 'The language of logic programming.',
        description: 'Prolog is a logic programming language used for symbolic and non-numeric computations.'
    },
    {
        name: 'Scheme',
        shorty: 'The language of functional programming.',
        description: 'Scheme is a minimalist dialect of Lisp known for its simple and elegant design.'
    },
    {
        name: 'Smalltalk',
        shorty: 'The language of object-oriented programming.',
        description: 'Smalltalk is an object-oriented programming language known for its simplicity and flexibility.'
    },
    {
        name: 'Erlang',
        shorty: 'The language of concurrency.',
        description: 'Erlang is a functional programming language known for its concurrency and fault-tolerance features.'
    },
    {
        name: 'Elixir',
        shorty: 'The language of the BEAM VM.',
        description: 'Elixir is a dynamic, functional programming language designed for building scalable and maintainable applications.'
    },
    {
        name: 'Clojure',
        shorty: 'The language of the JVM.',
        description: 'Clojure is a modern dialect of Lisp designed for concurrency and functional programming on the Java Virtual Machine (JVM).'
    },
  
  ];

  return (
    <main className="MainContent">
      {languages.map((language, index) => (
        <Card 
          key={index} 
          name={language.name} 
          shorty={language.shorty} 
          description={language.description} 
        />
      ))}
    </main>
  );
}

export default MainContent;
