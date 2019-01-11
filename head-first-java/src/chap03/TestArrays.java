package chap03;

public class TestArrays {
	public static void main(String[] args) {
		String[] islands = new String[4];
		islands[0] = "A";
		islands[1] = "B";
		islands[2] = "C";
		islands[3] = "D";
		
		int [] index = new int[4];
		index[0] = 1;
		index[1] = 2;
		index[2] = 3;
		index[3] = 4;
		
		int y = 0;
		int ref;
		while (y < 4) {
			ref = y;
			System.out.println(islands[ref]);
			y++;
		}
	}
}
