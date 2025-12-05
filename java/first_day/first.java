import java.util.Scanner;

public class first {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter name: ");
        String name = sc.nextLine();

        System.out.print("Enter your branch: ");
        String branch = sc.nextLine();

        System.out.print("Enter roll number: ");
        int roll_no = sc.nextInt();

        System.out.println("Name: " + name);
        System.out.println("Branch: " + branch);
        System.out.println("Roll number: " + roll_no);

        sc.close();
    }
}


