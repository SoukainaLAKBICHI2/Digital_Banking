# Digital Banking Application

## 🌐 Aperçu

Digital Banking est une application web complète permettant la gestion des clients et de leurs comptes bancaires. L’application offre une interface sécurisée permettant aux utilisateurs et aux administrateurs d’effectuer diverses opérations bancaires telles que la consultation de comptes, les virements, les crédits, les débits et la gestion des utilisateurs.

---
### 🛠 Architecture Backend
Backend de l'application de banque numérique développé avec **Spring Boot**. Ce service gère les clients, comptes bancaires, opérations (débit, crédit, transfert) et expose une API REST sécurisée.

```
Digital_Banking-Backend/ 
├── src/
│   ├── main/
│   │   ├── java/org/app/digital_banking_backend/ 
│   │   │   ├── DigitalBankingBackendApplication.java      
│   │   │   ├── DTOs/                             #Objets de transfert pour les API (CustomerDTO, AccountDTO, etc.)             
│   │   │   │   ├── AccountHistoryDTO.java
│   │   │   │   ├── AccountOperationDTO.java
│   │   │   │   ├── BankAccountDTO.java
│   │   │   │   ├── CreditDTO.java
│   │   │   │   ├── CurrentAccountDTO.java 
│   │   │   │   ├── CustomerDTO.java
│   │   │   │   ├── DebitDTO.java
│   │   │   │   ├── SavingAccountDTO.java 
│   │   │   │   └── TransferRequestDTO.java
│   │   │   ├── entities/                          # Entités JPA représentant les tables (Customer, BankAccount, etc.)        
│   │   │   │   ├── AccountOperation.java
│   │   │   │   ├── BankAccount.java
│   │   │   │   ├── CurrentAccount.java
│   │   │   │   ├── Customer.java
│   │   │   │   └── SavingAccount.java
│   │   │   ├── enums/                              #Enums pour les statuts et types d'opérations         
│   │   │   │   ├── AccountStatus.java
│   │   │   │   └── OperationType.java
│   │   │   ├── exceptions/                         # Exceptions personnalisées pour la gestion d'erreurs métiers        
│   │   │   │   ├── BalanceNotSufficientException.java
│   │   │   │   ├── BankAccountNotFoundException.java
│   │   │   │   └── CustomerNotFoundException.java
│   │   │   ├── mappers/                             # Convertisseurs entre DTOs et entités       
│   │   │   │   └── BankAccountMapperImpl.java
│   │   │   ├── repositories/                        # Interfaces JPA pour accéder aux données      
│   │   │   │   ├── AccountOperationRepository.java
│   │   │   │   ├── BankAccountRepository.java
│   │   │   │   └── CustomerRepository.java
│   │   │   ├── security/                            # Configuration de la sécurité (JWT, CORS, etc.)
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   └── SecurityController.java
│   │   │   ├── services/                            # Logique métier (interfaces + implémentations)   
│   │   │   │   ├── BankAccountService.java
│   │   │   │   └── BankAccountServiceImpl.java
│   │   │   └── web/                                 # Contrôleurs REST exposant l’API    
│   │   │       ├── BankAccountRestController.java 
│   │   │       └── CustomerRestController.java
│   │   └── resources/
│   │       ├── application.properties               # Configuration (BD, port, JWT secret...)
│   │       ├── static/                              
│   │       └── templates/                           
│   └── test/
│       └── java/org/app/digital_banking_backend/ 
│           └── DigitalBankingBackendApplication.java # Point d’entrée de l’application
├── pom.xml                                          
├── mvnw                                             
├── mvnw.cmd                                         
└── HELP.md
```
---

### 🧩 Architecture Frontend
Frontend de l'application de banque numérique développé avec Angular. Cette interface permet la gestion des clients, comptes bancaires et opérations, avec un système d'authentification sécurisé.

```
Digital_Banking_Frontend/
├── src/
│   └── app/
│       ├── accounts/                        # Composant affichant la liste des comptes
│       │   ├── accounts.component.ts
│       │   ├── accounts.component.html
│       │   ├── accounts.component.css
│       │   └── accounts.component.spec.ts
│       ├── admin-template/                  # Gabarit pour la mise en page admin
│       │   ├── admin-template.component.ts
│       │   ├── admin-template.component.html
│       │   └── admin-template.component.css
│       ├── customer-accounts/               # Composant des comptes d’un client
│       │   ├── customer-accounts.component.ts
│       │   ├── customer-accounts.component.html
│       │   ├── customer-accounts.component.css
│       │   └── customer-accounts.component.spec.ts
│       ├── customers/                       # Liste des clients
│       │   ├── customers.component.ts
│       │   ├── customers.component.html
│       │   ├── customers.component.css
│       │   └── customers.component.spec.ts
│       ├── edit-customer/                   # Édition d’un client
│       │   ├── edit-customer.component.ts
│       │   ├── edit-customer.component.html
│       │   ├── edit-customer.component.css
│       │   └── edit-customer.component.spec.ts
│       ├── new-customer/                    # Création d’un nouveau client
│       │   ├── new-customer.component.ts
│       │   ├── new-customer.component.html
│       │   ├── new-customer.component.css
│       │   └── new-customer.component.spec.ts
│       ├── login/                           # Formulaire de connexion
│       │   ├── login.component.ts
│       │   ├── login.component.html
│       │   ├── login.component.css
│       │   └── login.component.spec.ts
│       ├── not-authorized/                  # Page d'accès refusé
│       │   ├── not-authorized.component.ts
│       │   ├── not-authorized.component.html
│       │   ├── not-authorized.component.css
│       │   └── not-authorized.component.spec.ts
│       ├── navbar/                          # Barre de navigation principale
│       │   ├── navbar.component.ts
│       │   ├── navbar.component.html
│       │   ├── navbar.component.css
│       │   └── navbar.component.spec.ts
│       ├── services/                        # Services pour accès aux APIs
│       │   ├── account.service.ts
│       │   ├── auth.service.ts
│       │   ├── customer.service.ts
│       │   ├── account.service.spec.ts
│       │   ├── auth.service.spec.ts
│       │   └── customer.service.spec.ts
│       ├── guards/                          # Gardiens d'accès pour les routes
│       │   ├── authentication.guard.ts
│       │   ├── authorization.guard.ts
│       │   ├── authentication.guard.spec.ts
│       │   └── authorization.guard.spec.ts
│       ├── interceptors/                    # Intercepteurs HTTP (ajout JWT)
│       │   ├── app-http.interceptor.ts
│       │   └── app-http.interceptor.service.ts
│       ├── models/                          # Modèles TypeScript
│       │   ├── account.model.ts
│       │   └── customer.model.ts
│       ├── app.component.ts                 # Composant racine
│       ├── app.component.html
│       ├── app.component.css
│       ├── app.component.spec.ts
│       ├── app.config.ts                    # Configuration de l'application
│       └── app.routes.ts                    # Définition des routes Angular
```
