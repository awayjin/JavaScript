package chap03;
import java.util.Arrays;

/**
 * 
 * primitive主数据类型 
 * boolean double float 
 * byte short int long
 * char 
 * 
 * short-long-char
 * */
class Variable {
	public static void main(String[] args) {
        int x;
        x = 323;
        byte b = 92;
        boolean isFun = true;
        double d = 111;
        char c = 'f';
        long l = 232323;
        float f = 123.23f;
        System.out.println(b);
        System.out.println(f);
        System.out.println(d);
        byte bX = 33;
        char ch = 3;
        System.out.println(bX);
        
        Dog dog = new Dog();
        dog.hello();
        System.out.println(dog);
        
        /*数组*/
        int[] nums;
        nums = new int[7];
        nums[1] = 232;
        nums[3] = 111;
        Arrays.sort(nums);
        for (int i = 0; i < nums.length; i++) {
        	System.out.println("nums" + i + ": " + nums[i]);
        }
        
        // 创建Dog数组
        Dog[] pets;
        pets = new Dog[5];
        pets[0] = new Dog();
        pets[1] = new Dog();
        pets[0].name = "a";
        for (int i = 0; i < pets.length; i++) {
        	System.out.println("pets" + i + ": " + pets[i]);
//        	if (pets[i].name == "a") {
//        		System.out.println("n name " + pets[i].name);
//        	}
        }
        	
        Dog dog2 = new Dog();
        dog2.name = "55";
        	
    }
}