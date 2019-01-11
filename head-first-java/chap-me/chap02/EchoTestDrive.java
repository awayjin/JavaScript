public class EchoTestDrive {
    public static void main(String[] args) {
        Echo e1 = new Echo();
        Echo e2 = new Echo();
        e2.count = 3;

        int x = 0;
        while (x < 3) {
            e1.hello();

            if (x < 3) {
                e2.count = e2.count + 1;
            }
            if (x < 3) {
                e2.count = e2.count + e1.count;
            }
            x = x + 1;
        }

        System.out.print(e2.count);
    }
}