package chap03;

public class Dog {
	String name;
	void hello () {
	    System.out.println("Say Hello.");	
	}
	public static void main(String[] args) {
		Dog dog1 = new Dog();
		dog1.bark();
		dog1.name = "Bark";
		
		// 创建Dog数组
		Dog[] myDog = new Dog[3];
		myDog[0] = new Dog();
		myDog[1] = new Dog();
		myDog[2] = dog1;
		
		myDog[0].name = "Fred";
		myDog[1].name = "Mark";
		System.out.println("Last dog's name is " + myDog[2].name);
		
//		逐个对Dog执行bark
		int x = 0;
		while(x < myDog.length) {
			myDog[x].bark();
//			x = x + 1;
			x++;
		}
	}
	
	public void bark() {
		System.out.println(name + ",Say bark.");	
	}
}
