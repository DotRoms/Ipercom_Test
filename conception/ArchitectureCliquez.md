Project/
│
├── README.md                                # Readme file
│
├── conception/                              # Folder for conception files
│   ├── Architecture.md                      # Architecture presentation
│   ├── DataDictionary.md                    # Data dictionary presentation
│   ├── MCD.drawio                           # MCD conception file
│   ├── MLD.drawio                           # MLD conception file
│   └── MPD.drawio                           # MPD conception file
│
├── back/                                    # Backend project files
│   ├── Controllers/                         # Controllers folder
│   │   ├── UsersController.cs              # Users controller
│   │   └── UserTaskController.cs           # UserTask controller
│   │
│   ├── Models/                              # Models folder
│   │   ├── LoginRequest.cs                 # Login request model
│   │   ├── SignupRequest.cs                # Signup request model
│   │   ├── User.cs                         # User model for DB migration
│   │   └── UserTask.cs                     # UserTask model for DB migration
│   │
│   ├── Data/                                # Data folder
│   │   ├── ApplicationDbContext.cs         # File accessing the database
│   │   └── Migrations/                     # All migration files
│   │
│   ├── obj/                                 # Temporary files created by the compiler
│   │
│   ├── Properties/                          # Properties folder
│   │   └── launchSettings.json              # Configuration file for the launch
│   │
│   ├── appsettings.json                     # Configuration file for the application
│   ├── appsettings.Development.json         # Configuration for the development environment
│   ├── back.csproj                          # Project file package
│   └── Program.cs                           # Main file of the application
│
├── front/                                   # Frontend project files
│   ├── node_modules/                        # Node modules
│   ├── public/                              # Public files
│   └── src/                                 # Source code files
│       ├── actions/                         # Action files
│       ├── components/                      # Component files
│       │   ├── logic/                       # Logic of the components
│       │   ├── render/                      # Render of the components
│       │   └── UI/                          # UI components
│       │       └── design-system/           # Design system components
│       │            ├── button/             # Button component
│       │            ├── container/          # Container component
│       │            └── Icons/              # Icons components
│       ├── constants/                       # Constants files
│       ├── context/                         # Context files
│       ├── hooks/                           # Hooks files
│       ├── lib/                             # Lib files
│       ├── pages/                           # Pages files
│       ├── services/                        # Services files
│       ├── utils/                           # Utility files
│       ├── App.tsx                          # Central file of the application
│       ├── main.tsx                         # Main entry point file
│       ├── index.css                        # Tailwind CSS file
│       ├── .env                             # Environment file
│       ├── vite-env.d.ts                    # Vite environment file
│       ├── .gitignore                       # Git ignore file
│       ├── package-lock.json                # Package lock file
│       ├── package.json                     # Package file
│       ├── eslint.config.js                 # ESLint configuration file (Typescript + React)
│       ├── index.html                       # HTML index file
│       ├── tsconfig.json                    # Typescript configuration file
│       ├── tailwind.config.js               # Tailwind CSS configuration file
│       └── vite.config.ts                   # Vite configuration file
│
└── .gitignore                               # Git ignore file
