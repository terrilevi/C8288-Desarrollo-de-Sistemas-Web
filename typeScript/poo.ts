// setting up this shit:
// npm install -g ts-node typescript
// ts-node easyTypeScript.ts


// first thing we notice is that we are defining variable : string:
let variable: string;
variable = '42';
// veamos tipos simples:
console.log(variable)
// we annotate the type after THE NAME OF THE VARIABLE:
let nombre: string = "juan";

// Array<number>
// number[]

const numeros: Array<number> = [1,2,3,4];
const numeritos: number[] = [30,30,30]

// interface:
// con este definimos la estructura de un objeto:
interface Chat{
    name: string;
    model:string;
}

const foodChat: Chat = {name:"chatGPTfood", model:"4o"};
const greetChat: Chat = {name:"saysHello", model: "1o"};
function displayChat(chat:Chat) { // le estas poniendo un parametro, este parametro
    // que despues se inserte aca debe seguir estrictamente la estructura de la interfaz
    console.log(`Chat: ${chat.name}, model: ${chat.model}`);

}

displayChat(foodChat);
displayChat(greetChat);

// to install: npm install -g typescript
//  npx tsc –init

// tsconfig.json
// {
//  "compilerOptions": {
//  "module": "es2022",
//  "target": "es2017",
//  "strictNullChecks": true
//  },
//  "includes": [
//  "CodigoClase.ts"
//  ]
// }


// tecnicas de tipado mas avanzadas:
// reduccion narrowing, es cuando iniciamos con un tipo any o unknown
// pero luego hacemos que se reduzca a tipo mas especifico como: string, number
// tipos personalizados


// usar un typeof en una declaracion if es GUARDIA DE TIPOS
// lo que es una forma de reduccion
function narrowToNumber(value:unknown): number {
    if (typeof value !== 'number'){
        throw new Error('Value no es un numero');
    }
    return value;
}
// console.log(narrowToNumber("89")) // error
console.log(narrowToNumber(89898)) // oziozi

// 1. el uso de typeof:
////////////////////////////////////////////////////////////////////////////////
function isString(value: unknown): string {
    if (typeof value !== 'string') {
        throw new Error('El valor no es un string');
    }
    return value; // Ahora TypeScript sabe que 'value' es de tipo 'string'
}
   // Uso de la función
try {
    const resultado = isString("Hola Mundo");
    console.log(resultado); // "Hola Mundo"
} catch (error) {
    console.error(error);
}
////////////////////////////////////////////////////////////////////////////////
///// vayamos directo a tipos genericos:
function identidad<T>(arg:T): T { // aqui estamos haciendo:
    // creamos una funcion<T> , esta funcion recibe un argumento de tipo T,
    // y esta funcion devuelve un valor del mismo tipo
    return arg
}
let resultado1 = identidad<string>("Hola")
let resultado2 = identidad<boolean>(true)


///  a ver usemoslo con arrays:
// usemo tmb de paso es operador |(union):
// cuando un valor puede tener más de un tipo posible, podemos usarlo:
// es como: tipo A o tipo B o tipo C, entonces podemos deinifir el value de multiples tipos

let idUsuario: number | string;
idUsuario = 123;
idUsuario = "Jamaica";

// a ver en una funcions:
function imprimirID(id: number | string){
    console.log("ID" ,  id)
}
imprimirID(1231);
imprimirID("14134");


type Resultado = {exito:true, valor:number} | {exito:false, error:string};

function procesarResultado(resultado: Resultado) {
    if (resultado.exito) {

    }
}


// POO EXERCICES:
// Definimos la interfaz IUser con dos propiedades: name y email

//Define una interfaz IUser que tenga propiedades name y email. Luego, crea una clase que implemente
// esta interfaz y agregue un método adicional getRole() que pueda devolver "admin" o "user".
interface IUser {
    name: string;  // El nombre del usuario, de tipo string
    email: string; // El correo electrónico del usuario, de tipo string
  }
  
  // Creamos una clase User que implementa la interfaz IUser
  class User implements IUser {
    name: string;  // Implementa la propiedad 'name'
    email: string; // Implementa la propiedad 'email'
    private role: 'admin' | 'user';  // Definimos un rol privado que puede ser "admin" o "user"
  
    // Constructor que inicializa las propiedades name, email y role
    constructor(name: string, email: string, role: 'admin' | 'user') {
      this.name = name;  // Asigna el nombre del usuario
      this.email = email;  // Asigna el correo electrónico del usuario
      this.role = role;  // Asigna el rol del usuario (admin o user)
    }
  
    // Método que retorna el rol del usuario: "admin" o "user"
    getRole(): 'admin' | 'user' {
      return this.role;  // Devuelve el rol almacenado en la propiedad privada role
    }
  }
  
  // Ejemplo de uso de la clase User
  const admin = new User('Alice', 'alice@example.com', 'admin');
  const regularUser = new User('Bob', 'bob@example.com', 'user');
  
  console.log(admin.name, admin.email, admin.getRole());  // Salida: Alice alice@example.com admin
  console.log(regularUser.name, regularUser.email, regularUser.getRole());  // Salida: Bob bob@example.com user
  

//another way lol:

// Define the IUser interface
// Interfaces in TypeScript define the structure that objects should have
interface IUser {
  // The 'name' property is of type string
  // This means any object implementing IUser must have a 'name' property that is a string
  name: string;

  // The 'email' property is also of type string
  // Similarly, any object implementing IUser must have an 'email' property that is a string
  email: string;
}

// Define a type for the possible roles a user can have
// This creates a union type of two specific string literals
type UserRole = "admin" | "user";

// Create a class named User that implements the IUser interface
// The 'implements' keyword ensures that the class adheres to the structure defined by IUser
class User implements IUser {
  // Declare private properties for name and email
  // The 'private' keyword means these properties can only be accessed within this class
  private _name: string;
  private _email: string;

  // Declare a private property for role
  // This property is not part of the IUser interface, but we're adding it to our class
  private _role: UserRole;

  // Define the constructor for the User class
  // The constructor is called when we create a new instance of the User class
  constructor(name: string, email: string, role: UserRole = "user") {
    // Initialize the _name property with the provided name
    this._name = name;

    // Initialize the _email property with the provided email
    this._email = email;

    // Initialize the _role property with the provided role
    // If no role is provided, it defaults to "user" (see the default parameter in the constructor)
    this._role = role;
  }

  // Implement a getter for the name property
  // This allows us to access the private _name property from outside the class
  get name(): string {
    return this._name;
  }

  // Implement a setter for the name property
  // This allows us to modify the private _name property from outside the class
  set name(value: string) {
    this._name = value;
  }

  // Implement a getter for the email property
  get email(): string {
    return this._email;
  }

  // Implement a setter for the email property
  set email(value: string) {
    this._email = value;
  }

  // Implement the getRole() method
  // This method is not part of the IUser interface, but we're adding it to our class
  getRole(): UserRole {
    // Return the private _role property
    return this._role;
  }
}

// Example usage of the User class

// Create a new User instance with name "John Doe" and email "john@example.com"
// Since we don't specify a role, it will default to "user"
const regularUser = new User("John Doe", "john@example.com");

// Log the user's name, email, and role
console.log(regularUser.name);  // Output: John Doe
console.log(regularUser.email); // Output: john@example.com
console.log(regularUser.getRole()); // Output: user

// Create a new User instance with name "Admin User", email "admin@example.com", and role "admin"
const adminUser = new User("Admin User", "admin@example.com", "admin");

// Log the admin user's name, email, and role
console.log(adminUser.name);  // Output: Admin User
console.log(adminUser.email); // Output: admin@example.com
console.log(adminUser.getRole()); // Output: admin

// Change the admin user's name using the setter
adminUser.name = "Super Admin";

// Log the admin user's new name
console.log(adminUser.name);  // Output: Super Admin


// Ejercicio 2: Abstracción y clases concretas
// Crea una clase abstracta Employee con un método abstracto calculateSalary(). Luego, define clases
// concretas FullTimeEmployee y PartTimeEmployee que extiendan de Employee y calculen el salario
// basándose en diferentes parámetros como horas trabajadas o salario mensual.

// Definimos una clase abstracta Employee
abstract class Employee {
    name: string;  // Nombre del empleado
  
    constructor(name: string) {
      this.name = name;  // Asignamos el nombre al empleado
    }
  
    // Método abstracto que deberá ser implementado por las clases hijas
    abstract calculateSalary(): number;  // Cada empleado calculará el salario de manera diferente
  }
  
  // Clase FullTimeEmployee extiende de Employee
  class FullTimeEmployee extends Employee {
    monthlySalary: number;  // Salario mensual del empleado de tiempo completo
  
    constructor(name: string, monthlySalary: number) {
      super(name);  // Llamada al constructor de la clase base Employee
      this.monthlySalary = monthlySalary;  // Asignamos el salario mensual
    }
  
    // Implementación del método abstracto para calcular el salario del empleado de tiempo completo
    calculateSalary(): number {
      return this.monthlySalary;  // Devuelve el salario mensual como cálculo del salario
    }
  }
  
  // Clase PartTimeEmployee extiende de Employee
  class PartTimeEmployee extends Employee {
    hourlyRate: number;  // Tarifa por hora del empleado de medio tiempo
    hoursWorked: number;  // Horas trabajadas en el mes
  
    constructor(name: string, hourlyRate: number, hoursWorked: number) {
      super(name);  // Llamada al constructor de la clase base Employee
      this.hourlyRate = hourlyRate;  // Asignamos la tarifa por hora
      this.hoursWorked = hoursWorked;  // Asignamos las horas trabajadas
    }
  
    // Implementación del método abstracto para calcular el salario del empleado de medio tiempo
    calculateSalary(): number {
      return this.hourlyRate * this.hoursWorked;  // El salario se calcula multiplicando la tarifa por hora por las horas trabajadas
    }
  }
  
  // Ejemplo de uso:
  
  const fullTimeEmp = new FullTimeEmployee('Alice', 3000);  // Empleado a tiempo completo con salario mensual de 3000
  const partTimeEmp = new PartTimeEmployee('Bob', 20, 80);  // Empleado a medio tiempo con tarifa de 20 y 80 horas trabajadas
  
  console.log(`${fullTimeEmp.name} Salary: $${fullTimeEmp.calculateSalary()}`);  // Salida: Alice Salary: $3000
  console.log(`${partTimeEmp.name} Salary: $${partTimeEmp.calculateSalary()}`);  // Salida: Bob Salary: $1600
 
 
  
// another way lol:
// Define an abstract class named Employee
// Abstract classes can't be instantiated directly and may contain abstract methods
abstract class Employee {
  // Protected properties are accessible within this class and its subclasses
  protected name: string;
  protected id: number;

  // Constructor to initialize the employee's name and ID
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }

  // Abstract method calculateSalary
  // This method must be implemented by any class that extends Employee
  // The ': number' specifies that this method should return a number
  abstract calculateSalary(): number;

  // A concrete method that can be used by all Employee subclasses
  getEmployeeInfo(): string {
    return `Employee ID: ${this.id}, Name: ${this.name}`;
  }
}

// Define a concrete class FullTimeEmployee that extends Employee
class FullTimeEmployee extends Employee {
  private monthlySalary: number;

  // Constructor for FullTimeEmployee
  // It calls the parent constructor using 'super' and sets the monthly salary
  constructor(name: string, id: number, monthlySalary: number) {
    super(name, id);
    this.monthlySalary = monthlySalary;
  }

  // Implementation of the abstract calculateSalary method
  // For full-time employees, we simply return the monthly salary
  calculateSalary(): number {
    return this.monthlySalary;
  }
}

// Define a concrete class PartTimeEmployee that extends Employee
class PartTimeEmployee extends Employee {
  private hourlyRate: number;
  private hoursWorked: number;

  // Constructor for PartTimeEmployee
  // It calls the parent constructor and sets the hourly rate and hours worked
  constructor(name: string, id: number, hourlyRate: number, hoursWorked: number) {
    super(name, id);
    this.hourlyRate = hourlyRate;
    this.hoursWorked = hoursWorked;
  }

  // Implementation of the abstract calculateSalary method
  // For part-time employees, we multiply hourly rate by hours worked
  calculateSalary(): number {
    return this.hourlyRate * this.hoursWorked;
  }
}

// Example usage of the classes

// Create a full-time employee
const fullTimeEmp = new FullTimeEmployee("John Doe", 1001, 5000);
console.log(fullTimeEmp.getEmployeeInfo());
console.log(`Full-time employee salary: $${fullTimeEmp.calculateSalary()}`);

// Create a part-time employee
const partTimeEmp = new PartTimeEmployee("Jane Smith", 2001, 20, 80);
console.log(partTimeEmp.getEmployeeInfo());
console.log(`Part-time employee salary: $${partTimeEmp.calculateSalary()}`);

// This code demonstrates:
// 1. Abstract class creation (Employee)
// 2. Abstract method declaration (calculateSalary in Employee)
// 3. Concrete class implementation (FullTimeEmployee and PartTimeEmployee)
// 4. Method overriding (calculateSalary in both concrete classes)
// 5. Use of 'super' to call parent constructor
// 6. Polymorphism (both employee types can be treated as Employee objects)






//   Ejercicio 3: Herencia múltiple con interfaces
//   Define dos interfaces Flyable y Swimmable, cada una con un método abstracto fly() y swim(). Luego,
//   crea una clase Bird que implemente ambas interfaces y defina los métodos respectivos.  

// Definimos la interfaz Flyable con el método fly()
interface Flyable {
    fly(): void;  // Método abstracto para volar
  }
  
  // Definimos la interfaz Swimmable con el método swim()
  interface Swimmable {
    swim(): void;  // Método abstracto para nadar
  }
  
  // La clase Bird implementa ambas interfaces Flyable y Swimmable
  class Bird implements Flyable, Swimmable {
    name: string;  // Nombre del ave
  
    constructor(name: string) {
      this.name = name;  // Asignamos el nombre al ave
    }
  
    // Implementación del método fly() de la interfaz Flyable
    fly(): void {
      console.log(`${this.name} is flying!`);  // Muestra un mensaje indicando que el ave está volando
    }
  
    // Implementación del método swim() de la interfaz Swimmable
    swim(): void {
      console.log(`${this.name} is swimming!`);  // Muestra un mensaje indicando que el ave está nadando
    }
  }
  
  // Ejemplo de uso:
  
  const bird = new Bird('Duck');  // Creamos una instancia de Bird llamada Duck
  
  bird.fly();  // Salida: Duck is flying!
  bird.swim(); // Salida: Duck is swimming!


//another way:
// Define the Flyable interface
// This interface represents objects that can fly
interface Flyable {
  // Declare an abstract method fly()
  // This method doesn't have an implementation in the interface
  // Any class implementing this interface must provide its own implementation
  fly(): void;
}

// Define the Swimmable interface
// This interface represents objects that can swim
interface Swimmable {
  // Declare an abstract method swim()
  // Similar to fly(), this method needs to be implemented by any class using this interface
  swim(): void;
}

// Define the Bird class
// This class implements both Flyable and Swimmable interfaces
// By using 'implements', we're telling TypeScript that this class will provide
// implementations for all methods declared in these interfaces
class Bird implements Flyable, Swimmable {
  // Implement the fly() method from the Flyable interface
  fly(): void {
    // Here we provide the actual implementation of the fly method
    console.log("The bird is flying through the air!");
  }

  // Implement the swim() method from the Swimmable interface
  swim(): void {
    // Here we provide the actual implementation of the swim method
    console.log("The bird is swimming in the water!");
  }

  // We can also add additional methods specific to the Bird class
  chirp(): void {
    console.log("Tweet tweet!");
  }
}

// Example usage of the Bird class
// Create a new instance of the Bird class
const myBird = new Bird();

// Call the fly() method
myBird.fly();  // Output: The bird is flying through the air!

// Call the swim() method
myBird.swim(); // Output: The bird is swimming in the water!

// Call the chirp() method, which is specific to the Bird class
myBird.chirp(); // Output: Tweet tweet!

// This example demonstrates multiple inheritance through interfaces in TypeScript
// The Bird class inherits behavior from both Flyable and Swimmable interfaces
// This approach allows for flexible and modular code design, as a class can
// implement multiple interfaces to inherit different sets of behaviors


//   Ejercicio 4: Aplicar encapsulación y polimorfismo
//   Crea una clase BankAccount que tenga las propiedades accountNumber, balance, y métodos como
//   deposit() y withdraw(). Luego, extiende esta clase para crear SavingsAccount y CheckingAccount, y usa
//   polimorfismo para manejar estas cuentas de manera uniforme.

// Primero, definimos nuestra clase base BankAccount
class BankAccount {
    // Propiedades privadas para encapsulación
    private _accountNumber: string;
    protected _balance: number; // protected para que las clases hijas puedan acceder
  
    // Constructor para inicializar la cuenta
    constructor(accountNumber: string, initialBalance: number = 0) {
      this._accountNumber = accountNumber;
      this._balance = initialBalance;
    }
  
    // Getter para el número de cuenta (solo lectura)
    get accountNumber(): string {
      return this._accountNumber;
    }
  
    // Getter para el balance
    get balance(): number {
      return this._balance;
    }
  
    // Método para depositar dinero
    deposit(amount: number): void {
      if (amount > 0) {
        this._balance += amount;
        console.log(`Depositado: $${amount}. Nuevo balance: $${this._balance}`);
      } else {
        console.log("El monto del depósito debe ser positivo.");
      }
    }
  
    // Método para retirar dinero
    withdraw(amount: number): void {
      if (amount > 0 && amount <= this._balance) {
        this._balance -= amount;
        console.log(`Retirado: $${amount}. Nuevo balance: $${this._balance}`);
      } else {
        console.log("Fondos insuficientes o monto inválido.");
      }
    }
  }
  
  // Ahora, creamos una clase SavingsAccount que extiende BankAccount
  class SavingsAccount extends BankAccount {
    private _interestRate: number;
  
    constructor(accountNumber: string, initialBalance: number = 0, interestRate: number = 0.01) {
      super(accountNumber, initialBalance); // Llamamos al constructor de la clase padre
      this._interestRate = interestRate;
    }
  
    // Método específico para cuentas de ahorro
    addInterest(): void {
      const interest = this._balance * this._interestRate;
      this.deposit(interest);
      console.log(`Interés añadido: $${interest}`);
    }
  }
  
  // Finalmente, creamos una clase CheckingAccount que también extiende BankAccount
  class CheckingAccount extends BankAccount {
    private _overdraftLimit: number;
  
    constructor(accountNumber: string, initialBalance: number = 0, overdraftLimit: number = 100) {
      super(accountNumber, initialBalance);
      this._overdraftLimit = overdraftLimit;
    }
  
    // Sobrescribimos el método withdraw para permitir sobregiros hasta el límite
    withdraw(amount: number): void {
      if (amount > 0 && amount <= (this._balance + this._overdraftLimit)) {
        this._balance -= amount;
        console.log(`Retirado: $${amount}. Nuevo balance: $${this._balance}`);
      } else {
        console.log("Monto inválido o excede el límite de sobregiro.");
      }
    }
  }
  
  // Ahora, vamos a usar nuestras clases de manera polimórfica
  function operateCuenta(cuenta: BankAccount): void {
    cuenta.deposit(100);
    cuenta.withdraw(50);
    
    // Verificamos si la cuenta es de ahorros para añadir interés
    if (cuenta instanceof SavingsAccount) {
      cuenta.addInterest();
    }
  }
  
  // Creamos instancias de nuestras cuentas
  const cuentaAhorro = new SavingsAccount("SA001", 1000, 0.05);
  const cuentaCorriente = new CheckingAccount("CC001", 500, 200);
  
  // Operamos las cuentas de manera uniforme
  console.log("Operaciones en Cuenta de Ahorro:");
  operateCuenta(cuentaAhorro);
  
  console.log("\nOperaciones en Cuenta Corriente:");
  operateCuenta(cuentaCorriente);



// another way:

// Abstract base class for all bank accounts
// Abstract classes cannot be instantiated directly and are used as base classes for other classes
abstract class BankAccount {
  // Private properties for encapsulation
  // These properties are only accessible within this class
  private _accountNumber: string;
  private _balance: number;

  // Constructor to initialize the account
  // Protected access modifier allows this constructor to be used in derived classes
  protected constructor(accountNumber: string, initialBalance: number = 0) {
    this._accountNumber = accountNumber;
    this._balance = initialBalance;
  }

  // Getter for account number (read-only)
  // This allows external code to read but not modify the account number
  public get accountNumber(): string {
    return this._accountNumber;
  }

  // Getter for balance (read-only)
  // This allows external code to read but not directly modify the balance
  public get balance(): number {
    return this._balance;
  }

  // Method to deposit money
  // This method is public and can be called from outside the class
  public deposit(amount: number): void {
    if (amount > 0) {
      this._balance += amount;
      console.log(`Deposited ${amount}. New balance: ${this._balance}`);
    } else {
      console.log("Invalid deposit amount");
    }
  }

  // Abstract method for withdrawing money
  // This method must be implemented by all derived classes
  public abstract withdraw(amount: number): void;

  // Protected method to update balance
  // This method can be used by derived classes but not from outside
  protected updateBalance(amount: number): void {
    this._balance += amount;
  }
}

// SavingsAccount class that extends BankAccount
// This is an example of inheritance and polymorphism
class SavingsAccount extends BankAccount {
  private _interestRate: number;

  // Constructor for SavingsAccount
  constructor(accountNumber: string, initialBalance: number = 0, interestRate: number = 0.01) {
    // Call the parent class constructor using 'super'
    super(accountNumber, initialBalance);
    this._interestRate = interestRate;
  }

  // Implementation of the abstract withdraw method
  // This is required because BankAccount declares it as abstract
  public withdraw(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      this.updateBalance(-amount);
      console.log(`Withdrawn ${amount} from savings. New balance: ${this.balance}`);
    } else {
      console.log("Invalid withdrawal amount or insufficient funds");
    }
  }

  // Method specific to SavingsAccount
  public addInterest(): void {
    const interest = this.balance * this._interestRate;
    this.deposit(interest);
    console.log(`Added interest: ${interest}. New balance: ${this.balance}`);
  }
}

// CheckingAccount class that extends BankAccount
// Another example of inheritance and polymorphism
class CheckingAccount extends BankAccount {
  private _overdraftLimit: number;

  // Constructor for CheckingAccount
  constructor(accountNumber: string, initialBalance: number = 0, overdraftLimit: number = 100) {
    // Call the parent class constructor using 'super'
    super(accountNumber, initialBalance);
    this._overdraftLimit = overdraftLimit;
  }

  // Implementation of the abstract withdraw method
  // This version allows for overdraft up to the specified limit
  public withdraw(amount: number): void {
    if (amount > 0 && amount <= (this.balance + this._overdraftLimit)) {
      this.updateBalance(-amount);
      console.log(`Withdrawn ${amount} from checking. New balance: ${this.balance}`);
    } else {
      console.log("Invalid withdrawal amount or exceeds overdraft limit");
    }
  }
}

// Example usage demonstrating polymorphism
function performBankOperations(account: BankAccount) {
  console.log(`Account ${account.accountNumber} operations:`);
  account.deposit(1000);
  account.withdraw(500);
  console.log(`Final balance: ${account.balance}`);
  console.log("--------------------");
}

// Create instances of different account types
const savingsAccount = new SavingsAccount("SA001", 500);
const checkingAccount = new CheckingAccount("CA001", 1000);

// Use the same function to operate on different account types
// This demonstrates polymorphism - treating different types in a uniform way
performBankOperations(savingsAccount);
performBankOperations(checkingAccount);

// Demonstrate specific behavior of SavingsAccount
savingsAccount.addInterest();

// This code demonstrates encapsulation (private properties, public methods),
// inheritance (SavingsAccount and CheckingAccount extending BankAccount),
// and polymorphism (using BankAccount type to handle different account types uniformly).


