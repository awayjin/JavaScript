class Dog {
    int size;
    String bread;
    String name;

    void bark () {
        System.out.println('Ruff.!')
    }
}

class DogTestDriver {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.size = 40;
        d.bark();
    }
}