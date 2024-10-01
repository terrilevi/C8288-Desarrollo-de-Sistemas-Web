// Ejercicio 1: Función genérica de búsqueda
// Crea una función genérica llamada findItem que acepte un array de cualquier tipo T y un predicado (una
// función que determina si un elemento cumple una condición). La función debe devolver el primer
// elemento que cumpla con el predicado o null si no se encuentra.

// Ejercicio 1: Función genérica de búsqueda

// Define a generic function named 'findItem'
// <T> declares this as a generic function, where T is a type parameter
// This allows the function to work with arrays of any type
function findItem<T>(
    // 'items' is an array of type T (T[])
    items: T[],
    // 'predicate' is a function that takes an item of type T and returns a boolean
    // This function determines whether an item meets a certain condition
    predicate: (item: T) => boolean
  ): T | null {
    // Use the 'for...of' loop to iterate through each item in the array
    // This is a more modern and readable way to loop through arrays in JavaScript/TypeScript
    for (const item of items) {
      // Call the predicate function for each item
      // If the predicate returns true, we've found a match
      if (predicate(item)) {
        // Return the first item that satisfies the predicate
        return item;
      }
    }
  
    // If we've gone through all items without finding a match, return null
    // This indicates that no item satisfying the predicate was found
    return null;
  }
  
  // Example usage of the findItem function
  
  // Define an array of numbers
  const numbers = [1, 2, 3, 4, 5];
  
  // Use findItem to find the first even number
  // The predicate function checks if a number is even (divisible by 2 with no remainder)
  const firstEven = findItem(numbers, (num) => num % 2 === 0);
  console.log("First even number:", firstEven); // Output: First even number: 2
  
  // Define an array of objects representing people
  const people = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
  ];
  
  // Use findItem to find the first person over 30
  // The predicate function checks if a person's age is greater than 30
  const firstOver30 = findItem(people, (person) => person.age > 30);
  console.log("First person over 30:", firstOver30); 
  // Output: First person over 30: { name: "Charlie", age: 35 }
  
  // Use findItem to search for a condition that isn't met
  // In this case, we're looking for a negative number, which doesn't exist in our array
  const firstNegative = findItem(numbers, (num) => num < 0);
  console.log("First negative number:", firstNegative); // Output: First negative number: null
  
  // This implementation demonstrates the power and flexibility of generic functions in TypeScript
  // The findItem function can work with arrays of any type, from simple numbers to complex objects
  // It uses a predicate function to determine which item to return, allowing for very flexible search criteria
  // If no item is found that satisfies the predicate, it returns null, handling the "not found" case gracefully


// Ejercicio 2: Genéricos con restricciones
// Crea una clase genérica KeyValueStore<T> que almacene pares de clave-valor, donde la clave sea una
// cadena y el valor sea del tipo genérico T. Implementa métodos para agregar, obtener y eliminar valores
// del almacén. Asegúrate de que el almacén solo acepte valores que tengan una propiedad id.

// Define an interface for the constraint on our generic type
interface HasId {
    id: string | number;
}

// Define the KeyValueStore class
// T extends HasId means T must be a type that includes an 'id' property
class KeyValueStore<T extends HasId> {
    // Private property to store our key-value pairs
    private store: { [key: string]: T } = {};

    // Method to add a new key-value pair
    add(key: string, value: T): void {
        // Store the value with the given key
        this.store[key] = value;
    }

    // Method to get a value by its key
    get(key: string): T | undefined {
        // Return the value associated with the key, or undefined if not found
        return this.store[key];
    }

    // Method to remove a key-value pair by its key
    remove(key: string): void {
        // Delete the key-value pair from the store
        delete this.store[key];
    }

    // Method to get all values in the store
    getAll(): T[] {
        // Return an array of all values in the store
        return Object.values(this.store);
    }
}

// Example usage:

// Define an interface for our custom type
interface User extends HasId {
    id: number;
    name: string;
    email: string;
}

// Create a new KeyValueStore instance for User objects
const userStore = new KeyValueStore<User>();

// Add some users
userStore.add("user1", { id: 1, name: "Alice", email: "alice@example.com" });
userStore.add("user2", { id: 2, name: "Bob", email: "bob@example.com" });

// Get a user
const user = userStore.get("user1");
console.log(user); // Output: { id: 1, name: "Alice", email: "alice@example.com" }

// Remove a user
userStore.remove("user2");

// Get all users
const allUsers = userStore.getAll();
console.log(allUsers); // Output: [{ id: 1, name: "Alice", email: "alice@example.com" }]

// This will cause a TypeScript error because the object doesn't have an 'id' property
// userStore.add("invalid", { name: "Invalid", email: "invalid@example.com" });



// Ejercicio 3: Promesas con genéricos
// Define una función genérica fetchData<T> que acepte una URL y devuelva una promesa que resuelva
// con un dato de tipo T. Debes simular una solicitud HTTP que devuelva el dato correcto en función del
// tipo proporcionado.

// Define a generic function fetchData that takes a type parameter T
// This function simulates fetching data from a URL and returning it as a Promise
function fetchData<T>(url: string): Promise<T> {
    // Return a new Promise
    // The Promise constructor takes a function with resolve and reject parameters
    return new Promise((resolve, reject) => {
      // Simulate an asynchronous HTTP request using setTimeout
      // In a real-world scenario, this would be replaced with an actual HTTP request
      setTimeout(() => {
        // Simulate different responses based on the URL
        if (url.includes('users')) {
          // If the URL contains 'users', return a user object
          // We use type assertion (as T) to tell TypeScript that this object matches type T
          resolve({
            id: 1,
            name: 'John Doe',
            email: 'john@example.com'
          } as T);
        } else if (url.includes('posts')) {
          // If the URL contains 'posts', return a post object
          resolve({
            id: 1,
            title: 'Hello World',
            body: 'This is a post'
          } as T);
        } else {
          // If the URL doesn't match any known patterns, reject the Promise with an error
          reject(new Error('Invalid URL'));
        }
      }, 1000); // Simulate a 1-second delay
    });
  }
  
  // Example usage of the fetchData function
  
  // Define interfaces for the expected data types
  interface User {
    id: number;
    name: string;
    email: string;
  }
  
  interface Post {
    id: number;
    title: string;
    body: string;
  }
  
  // Fetch user data
  // We specify User as the generic type parameter
  fetchData<User>('https://api.example.com/users/1')
    .then((user) => {
      // TypeScript knows that 'user' is of type User
      console.log('User:', user.name);
    })
    .catch((error) => {
      console.error('Error fetching user:', error);
    });
  
  // Fetch post data
  // We specify Post as the generic type parameter
  fetchData<Post>('https://api.example.com/posts/1')
    .then((post) => {
      // TypeScript knows that 'post' is of type Post
      console.log('Post title:', post.title);
    })
    .catch((error) => {
      console.error('Error fetching post:', error);
    });
  
  // Attempt to fetch data with an invalid URL
  fetchData<User>('https://api.example.com/invalid')
    .then((data) => {
      console.log('This should not be called');
    })
    .catch((error) => {
      // This will be called due to the invalid URL
      console.error('Error:', error.message);
    });
  
  // This implementation demonstrates how to use generics with Promises in TypeScript
  // The fetchData function can work with different data types while maintaining type safety
  // It simulates different responses based on the URL, showcasing how real-world API calls might behave
  // The use of Promises allows for asynchronous operations and proper error handling

// Ejercicio 4: Función genérica de combinación
// Crea una función genérica llamada merge<T, U> que acepte dos objetos de diferentes tipos y los
// combine en uno solo. La función debe devolver un objeto que contenga todas las propiedades de ambos
 // objetos.
 // Define a generic function merge that takes two objects of types T and U
// and returns a new object with properties from both T and U
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
    // Create a new object that combines properties from both input objects
    return { ...obj1, ...obj2 };
  }
  
  // Example usage:
  
  // Define some sample object types
  interface Person {
    name: string;
    age: number;
  }
  
  interface Address {
    street: string;
    city: string;
    country: string;
  }
  
  // Create instances of these objects
  const person: Person = {
    name: "Alice",
    age: 30
  };
  
  const address: Address = {
    street: "123 Main St",
    city: "Wonderland",
    country: "Fantasyland"
  };
  
  // Use the merge function to combine the person and address objects
  const personWithAddress = merge(person, address);
  
  // Log the result
  console.log(personWithAddress);
  // Output: {
  //   name: "Alice",
  //   age: 30,
  //   street: "123 Main St",
  //   city: "Wonderland",
  //   country: "Fantasyland"
  // }
  
  // TypeScript knows the exact structure of the merged object
  console.log(personWithAddress.name);    // OK
  console.log(personWithAddress.street);  // OK
  // console.log(personWithAddress.zipCode);  // Error: Property 'zipCode' does not exist
  
  // Another example with different object types
  interface Car {
    make: string;
    model: string;
  }
  
  interface CarDetails {
    year: number;
    color: string;
  }
  
  const carBasic: Car = {
    make: "Toyota",
    model: "Corolla"
  };
  
  const carDetails: CarDetails = {
    year: 2022,
    color: "blue"
  };
  
  const fullCarInfo = merge(carBasic, carDetails);
  
  console.log(fullCarInfo);
  // Output: {
  //   make: "Toyota",
  //   model: "Corolla",
  //   year: 2022,
  //   color: "blue"
  // }
    

//     Ejercicio 5: Genéricos con múltiples parámetros de tipo
// Escribe una función genérica llamada mapTwoArrays<T, U> que acepte dos arrays de tipos diferentes y
// una función de mapeo. La función debe devolver un nuevo array que contenga los resultados de aplicar
// la función de mapeo a los elementos de ambos arrays.
// Define a generic function 'mapTwoArrays' with two type parameters 'T' and 'U'
function mapTwoArrays<T, U>(
    // First parameter: an array of type T
    arr1: T[],
    // Second parameter: an array of type U
    arr2: U[],
    // Third parameter: a mapping function that takes one element from each array and returns a value
    mapFn: (a: T, b: U) => any
  ): any[] {
    // Get the minimum length between the two input arrays
    const minLength = Math.min(arr1.length, arr2.length);
    
    // Use the Array.from method to create a new array
    return Array.from({ length: minLength }, (_, i) => {
      // For each index, call the mapping function with elements from both arrays
      return mapFn(arr1[i], arr2[i]);
    });
  }
  
  // Example usage of the mapTwoArrays function
  const numbers = [1, 2, 3, 4];
  const words = ['one', 'two', 'three', 'four'];
  
  const result = mapTwoArrays(numbers, words, (num, word) => {
    return `${word} is ${num}`;
  });
  
  console.log(result);
  // Output: ['one is 1', 'two is 2', 'three is 3', 'four is 4']

// Ejercicio 6: Genéricos con interfaces
// Define una interfaz genérica ApiResponse<T> que represente una respuesta de una API. La interfaz debe
// tener una propiedad status de tipo número y una propiedad data de tipo T. Crea otra interfaz
// PaginatedResponse<T> que extienda ApiResponse<T> y agregue propiedades para manejar paginación.
// Define the generic ApiResponse interface
interface ApiResponse<T> {
    status: number;
    data: T;
  }
  
  // Define the generic PaginatedResponse interface that extends ApiResponse
  interface PaginatedResponse<T> extends ApiResponse<T> {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
  }
  
  // Example usage of the interfaces
  interface User {
    id: number;
    name: string;
    email: string;
  }
  
  // Create a function that simulates an API call returning a paginated response
  function fetchUsers(page: number, itemsPerPage: number): PaginatedResponse<User[]> {
    // Simulated API response
    return {
      status: 200,
      data: [
        { id: 1, name: "Alice", email: "alice@example.com" },
        { id: 2, name: "Bob", email: "bob@example.com" },
      ],
      currentPage: page,
      totalPages: 5,
      itemsPerPage: itemsPerPage,
      totalItems: 50,
    };
  }
  
  // Use the function and log the result
  const usersResponse = fetchUsers(1, 10);
  console.log(usersResponse);

// Ejercicio 7: Clase genérica de caché
// Crea una clase genérica Cache<T> que permita almacenar y recuperar valores en memoria. La clase debe
// tener métodos para agregar un valor con una clave de tipo cadena, obtener el valor por clave y eliminar
// un valor por clave. Asegúrate de que el tipo T sea opcionalmente restringido a objetos que tengan una
// propiedad id.

// Define a type for objects with an 'id' property
// This allows us to constrain the generic type to objects with an 'id'
type WithId = { id: string | number };

// Define the generic Cache class
// The 'T extends WithId | any' means T can be either a type that extends WithId or any other type
// This allows the cache to work with objects that have an 'id' property or any other type of data
class Cache<T extends WithId | any> {
  // Private property to store the cached items
  // We use a Map because it's efficient for key-value storage
  // The keys are strings (cache keys), and the values are of type T (cached items)
  private items: Map<string, T>;

  // Constructor to initialize the cache
  // It's called when we create a new instance of the Cache class
  constructor() {
    // Initialize the items property with a new empty Map
    this.items = new Map<string, T>();
  }

  // Method to add an item to the cache
  // It takes a key of type string and a value of type T
  add(key: string, value: T): void {
    // Use the set method of Map to store the key-value pair
    this.items.set(key, value);
  }

  // Method to get an item from the cache
  // It takes a key of type string and returns a value of type T or undefined
  get(key: string): T | undefined {
    // Use the get method of Map to retrieve the value associated with the key
    // If the key doesn't exist, this will return undefined
    return this.items.get(key);
  }

  // Method to remove an item from the cache
  // It takes a key of type string and returns a boolean indicating success
  remove(key: string): boolean {
    // Use the delete method of Map to remove the key-value pair
    // This returns true if an element was removed, and false otherwise
    return this.items.delete(key);
  }

  // Method to clear all items from the cache
  clear(): void {
    // Use the clear method of Map to remove all key-value pairs
    this.items.clear();
  }

  // Method to get all keys in the cache
  // It returns an array of strings (the keys)
  keys(): string[] {
    // Convert the keys iterator to an array using Array.from()
    return Array.from(this.items.keys());
  }

  // Method to get the size of the cache
  // It returns the number of items in the cache
  size(): number {
    // Use the size property of Map to get the number of key-value pairs
    return this.items.size;
  }
}

// Example usage

// Create a cache for objects with 'id' property
// The type parameter is explicitly set to WithId
const userCache = new Cache<WithId>();

// Add a user object to the cache
// The object { id: 1, name: 'Alice' } satisfies the WithId type
userCache.add('user1', { id: 1, name: 'Alice' });

// Retrieve and log the user object
console.log(userCache.get('user1')); // Output: { id: 1, name: 'Alice' }

// Create a cache for any type of data
// The type parameter is set to 'any', allowing storage of any data type
const generalCache = new Cache<any>();

// Add a string to the cache
generalCache.add('data1', 'Some string data');

// Add a number to the cache
generalCache.add('data2', 42);

// Retrieve and log the cached data
console.log(generalCache.get('data1')); // Output: Some string data
console.log(generalCache.get('data2')); // Output: 42

// This implementation demonstrates a flexible, generic cache class in TypeScript
// It can store objects with an 'id' property or any other type of data
// The class provides methods for adding, retrieving, and removing items,
// as well as utility methods for clearing the cache and getting information about its contents
// The use of generics allows for type safety while maintaining flexibility in the types of data that can be cached



// Ejercicio 8: Clase genérica con restricciones múltiples
// Crea una clase genérica SortableCollection<T> que acepte solo objetos que tengan propiedades name y
// age. Implementa un método sortByAge que devuelva los objetos ordenados por edad y otro método
// sortByName que los ordene por nombre.
// Define an interface that describes the structure of objects
// that can be stored in our SortableCollection
// This ensures that all objects have 'name' and 'age' properties
interface Sortable {
    name: string;
    age: number;
  }
  
  // Define a generic class SortableCollection
  // The type parameter T is constrained to extend Sortable
  // This means T must be a type that has at least the properties defined in Sortable
  class SortableCollection<T extends Sortable> {
    // Private property to store the collection of items
    // It's an array of type T, which we know has 'name' and 'age' properties
    private items: T[];
  
    // Constructor to initialize the collection
    // It can optionally take an initial array of items
    constructor(initialItems: T[] = []) {
      // Assign the initial items to our private items array
      this.items = initialItems;
    }
  
    // Method to add an item to the collection
    // It takes an item of type T and doesn't return anything (void)
    addItem(item: T): void {
      // Push the new item to the end of the items array
      this.items.push(item);
    }
  
    // Method to get all items in the collection
    // It returns a new array with all the items
    // We return a new array to prevent direct modification of our private items
    getItems(): T[] {
      // Create a shallow copy of the items array
      return [...this.items];
    }
  
    // Method to sort the collection by age
    // It returns a new array of items sorted by age in ascending order
    sortByAge(): T[] {
      // Use the spread operator to create a copy of the items array
      // Then use the sort method with a comparison function
      return [...this.items].sort((a, b) => a.age - b.age);
    }
  
    // Method to sort the collection by name
    // It returns a new array of items sorted by name in alphabetical order
    sortByName(): T[] {
      // Use the spread operator to create a copy of the items array
      // Then use the sort method with a comparison function
      return [...this.items].sort((a, b) => a.name.localeCompare(b.name));
    }
  }
  
  // Example usage of the SortableCollection class
  
  // Define a type that extends Sortable
  // This type has additional properties beyond what Sortable requires
  type Person = Sortable & {
    id: number;
    email: string;
  };
  
  // Create a new SortableCollection instance for Person objects
  const peopleCollection = new SortableCollection<Person>();
  
  // Add some Person objects to the collection
  peopleCollection.addItem({ id: 1, name: "Alice", age: 30, email: "alice@example.com" });
  peopleCollection.addItem({ id: 2, name: "Bob", age: 25, email: "bob@example.com" });
  peopleCollection.addItem({ id: 3, name: "Charlie", age: 35, email: "charlie@example.com" });
  
  // Get all items in the collection
  console.log("All items:", peopleCollection.getItems());
  
  // Sort the collection by age and log the result
  console.log("Sorted by age:", peopleCollection.sortByAge());
  
  // Sort the collection by name and log the result
  console.log("Sorted by name:", peopleCollection.sortByName());
  
  // This implementation demonstrates a generic class with multiple constraints
  // It ensures type safety by only accepting objects with 'name' and 'age' properties
  // The class provides methods for adding items, retrieving all items,
  // and sorting the items by age or name
  // The use of generics allows the class to work with different types
  // as long as they satisfy the Sortable interface requirements



// Ejercicio 9: Promesas con genéricos y manejo de errores
// Escribe una función genérica fetchWithRetry<T> que acepte una URL y un número máximo de
// reintentos. La función debe devolver una promesa de tipo T y reintentar la solicitud si falla, hasta
// alcanzar el número máximo de reintentos.

// Import the 'fetch' function from the 'node-fetch' package
// This is necessary because we're simulating HTTP requests in a Node.js environment
import fetch from 'node-fetch';

// Define a generic function fetchWithRetry
// T is the type parameter representing the expected return type of the fetch operation
async function fetchWithRetry<T>(
  url: string,           // The URL to fetch data from
  maxRetries: number     // The maximum number of retry attempts
): Promise<T> {          // The function returns a Promise of type T
  // Initialize a variable to keep track of the current retry attempt
  let retries = 0;

  // Start an infinite loop that we'll break out of when we succeed or exhaust all retries
  while (true) {
    try {
      // Attempt to fetch data from the URL
      const response = await fetch(url);

      // Check if the response is not ok (i.e., status code is not in the 200-299 range)
      if (!response.ok) {
        // If the response is not ok, throw an error
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // If we reach here, the fetch was successful
      // Parse the response body as JSON and cast it to type T
      const data = await response.json() as T;

      // Return the parsed data, which fulfills the promise
      return data;

    } catch (error) {
      // If an error occurred during fetch or parsing...

      // Increment the retry counter
      retries++;

      // Check if we've reached the maximum number of retries
      if (retries >= maxRetries) {
        // If so, throw an error to indicate failure after all retries
        throw new Error(`Failed to fetch after ${maxRetries} retries: ${error.message}`);
      }

      // If we haven't reached max retries, log the error and continue the loop
      console.log(`Attempt ${retries} failed. Retrying...`);

      // Optional: add a delay before the next retry
      // This uses a simple sleep function that returns a promise
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
    }
  }
}

// Example usage of the fetchWithRetry function

// Define an interface for the expected shape of our data
interface User {
  id: number;
  name: string;
  email: string;
}

// Async immediately-invoked function expression (IIFE) to use await at the top level
(async () => {
  try {
    // Attempt to fetch user data with up to 3 retries
    const user = await fetchWithRetry<User>('https://api.example.com/user/1', 3);
    
    // If successful, log the user data
    console.log('User data:', user);
  } catch (error) {
    // If all retries fail, log the error
    console.error('Failed to fetch user data:', error.message);
  }
})();

// This implementation demonstrates:
// 1. Use of generics (T) to create a flexible function that can handle different data types
// 2. Async/await syntax for handling asynchronous operations
// 3. Error handling with try/catch blocks
// 4. Implementing a retry mechanism for failed requests
// 5. Type casting of the response to the expected type T
// 6. Use of interfaces to define the shape of expected data

// Ejercicio 10: Implementar una pila (Stack) genérica
// Crea una clase genérica Stack<T> que funcione como una pila (LIFO). La clase debe tener métodos para
// agregar elementos (push), eliminar el último elemento agregado (pop) y obtener el último elemento sin
// eliminarlo (peek).

// Define a generic class Stack
// T is a type parameter that allows the stack to work with any data type
class Stack<T> {
    // Private property to store the elements of the stack
    // We use an array to hold the elements
    private elements: T[];
  
    // Constructor to initialize the stack
    // It creates an empty array to store the elements
    constructor() {
      this.elements = [];
    }
  
    // Method to add an element to the top of the stack (push operation)
    // It takes an element of type T and doesn't return anything (void)
    push(element: T): void {
      // Add the element to the end of the array
      // In a stack, the end of the array represents the top of the stack
      this.elements.push(element);
    }
  
    // Method to remove and return the top element from the stack (pop operation)
    // It returns an element of type T or undefined if the stack is empty
    pop(): T | undefined {
      // Remove and return the last element from the array
      // This simulates removing the top element from the stack
      return this.elements.pop();
    }
  
    // Method to view the top element of the stack without removing it (peek operation)
    // It returns an element of type T or undefined if the stack is empty
    peek(): T | undefined {
      // Check if the stack is not empty
      if (this.elements.length > 0) {
        // Return the last element of the array without removing it
        // This is the top element of the stack
        return this.elements[this.elements.length - 1];
      }
      // If the stack is empty, return undefined
      return undefined;
    }
  
    // Method to check if the stack is empty
    // It returns a boolean: true if the stack is empty, false otherwise
    isEmpty(): boolean {
      // Check if the array has no elements
      return this.elements.length === 0;
    }
  
    // Method to get the number of elements in the stack
    // It returns the current size of the stack as a number
    size(): number {
      // Return the length of the array
      return this.elements.length;
    }
  
    // Method to clear all elements from the stack
    // It doesn't return anything (void)
    clear(): void {
      // Reset the elements array to an empty array
      this.elements = [];
    }
  }
  
  // Example usage of the Stack class
  
  // Create a new Stack instance that will store numbers
  const numberStack = new Stack<number>();
  
  // Push some numbers onto the stack
  numberStack.push(1);
  numberStack.push(2);
  numberStack.push(3);
  
  console.log("Stack size after pushes:", numberStack.size()); // Output: 3
  
  console.log("Top element (peek):", numberStack.peek()); // Output: 3
  
  console.log("Popped element:", numberStack.pop()); // Output: 3
  console.log("Stack size after pop:", numberStack.size()); // Output: 2
  
  console.log("Is stack empty?", numberStack.isEmpty()); // Output: false
  
  // Clear the stack
  numberStack.clear();
  console.log("Stack size after clear:", numberStack.size()); // Output: 0
  console.log("Is stack empty after clear?", numberStack.isEmpty()); // Output: true
  
  // Create a Stack instance for strings to demonstrate generics
  const stringStack = new Stack<string>();
  stringStack.push("Hello");
  stringStack.push("World");
  console.log("String stack top element:", stringStack.peek()); // Output: "World"
  
  // This implementation demonstrates:
  // 1. Use of generics (T) to create a flexible stack that can work with any data type
  // 2. Implementation of core stack operations: push, pop, and peek
  // 3. Additional utility methods: isEmpty, size, and clear
  // 4. How to use the stack with different data types (numbers and strings in this example)
  // 5. Proper encapsulation by using a private array to store elements