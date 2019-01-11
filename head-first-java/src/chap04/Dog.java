package chap04;

public class Dog {
	int size;
	String name;
	
	public static void main(String [] args) {
		Dog dog1 = new Dog();
		dog1.size = 20;
		dog1.bark();
		dog1.size = 160;
		dog1.bark();
		dog1.size = 1;
		dog1.bark();


		double val = dog1.sayHello(99);
		int arg = 11;
		int val2 = dog1.sayHello(arg);
		System.out.println(val);
		System.out.println(val2);
	}

	int sayHello (int par) {
		return par;
	}
	
	void bark() {
		if (size > 60) {
			System.out.println("Woof");
		} else if (size > 14) {
			System.out.println("Ruff");
		} else {
			System.out.println("Yip");
		}
	}
}
