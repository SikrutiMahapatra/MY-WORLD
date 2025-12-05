import java.util.Scanner;

public class fourth {
    public static void main(String[] args){
        Scanner sc= new Scanner(System.in);
        System.out.print("enter any number from 1-7:");
        int random=sc.nextInt();
        switch(random){
            case 1:
                System.out.println("monday");
                break;
            case 2:
                System.out.println("tuesday");
                break;
            case 3:
                System.out.println("wednesday");
                break;
            case 4:
                System.out.println("thrusday");
                break;
            case 5:
                System.out.println("friday");
                break;
            case 6:
                System.out.println("saturday");
                break;

            case 7:
                System.out.println("sunday");
                break;
            default:
                System.err.println("wrong value");
                break;
        }
        sc.close();
}
}
