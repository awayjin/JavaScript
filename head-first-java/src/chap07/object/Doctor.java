package chap07.object;

/**
 * Created by jinw01 on 2019/2/21.
 */
public class Doctor {
    boolean worksAtHospital;
    void treatPatient() {}
    public static void main(String[] args) {
        boolean worksAtHospital = false;
        FamilyDoctor family = new FamilyDoctor();
        family.treatPatient();
        System.out.println("worksAtHospital:" + worksAtHospital);
    }
}

class FamilyDoctor extends Doctor {
    void treatPatient() {
        System.out.println("2-worksAtHospital:" + worksAtHospital);
    }
    void makeIn() {

    }
}
