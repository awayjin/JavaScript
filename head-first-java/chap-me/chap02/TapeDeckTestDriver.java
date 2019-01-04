public class TapeTeckTestDriver {
    public static void mainb(String[] args) {
        TapeTeck t = new TapeTeck();
        t.canRecord = true;
        t.playTape();

        if (t.canRecord == true) {
            t.recordTape();
        }
    }
}