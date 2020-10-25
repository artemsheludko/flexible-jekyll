package com.anushka.project1;

import javax.swing.*;
import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Parser that will parse the input and create GUI.
 */
class Parser {
    // represents the file it is parsing.
    File file;
    List<String> lines;
    List<String> words = new ArrayList<>();

    int wordIndex = 0;


    Parser(File file) throws IOException {
        this.file = file;
        // get all the lines of file.
        lines = Files.readAllLines(Path.of(file.getPath()), StandardCharsets.UTF_8);
        start();
    }


    // It will start parsing the file.
    void start() {
        // remove all the extra space from all the lines.
        for (String cur : lines) {
            // regex for removing extra space.
//            cur = cur.replaceAll("^ +| +$|( )+", "$1");
            cur = cur.replaceAll("[\\s]+", " ");
            
            char[] curArr = cur.toCharArray();
            boolean in_space = false;
            for(int i = 0; i < curArr.length; i ++) {
                if(in_space && curArr[i] == ' ')  {
                    curArr[i] = '_';
                } else if(in_space && curArr[i] == '"') {
                    in_space = false;
                } else if(curArr[i] == '"') {
                    in_space = true;
                }
            }
            if(in_space) error(wordIndex, "Invalid String");
            cur = String.valueOf(curArr);
            if (cur.equals("")) continue;
            // remove lines(\n), store only words.
            words.addAll(Arrays.asList(cur.split(" ")));
        }
        System.out.println(words);
        try {
            // parse the File.
            parse();
        } catch (Exception e) {
            // if any exception occurs, report as error with current wordIndex.
            error(wordIndex, "Syntax error!");
        }
    }

    /**
     * It will parse every Window.
     */
    public void parse() {
        while(wordIndex < words.size()) {
            if(words.get(wordIndex).equals("")) {
                wordIndex += 1;
                continue;
            }
            // Frame for current window.
            JFrame frame;

            // first line should be "Window ..."
            if (!words.get(wordIndex).equals("Window"))
                error(0, "First line must start with window in format Window \"TITlE\"!");

            wordIndex += 1;

            // there is a window create it.
            frame = new JFrame();

            // get the title for Window.
            String title = ifStringGetString(getString());
            frame.setTitle(title);

            // set Size
            if (!words.get(wordIndex).startsWith("(")) error(0, "Size must start with '('");
            int width = ifIntGetInt(words.get(wordIndex).substring(1, words.get(wordIndex).length() - 1));
            if (!words.get(wordIndex).endsWith(",") || !words.get(wordIndex + 1).endsWith(")"))
                error(0, "Size should be specified as (width, height)");
            wordIndex += 1;
            int height = ifIntGetInt(words.get(wordIndex).substring(0, words.get(wordIndex).length() - 1));
            wordIndex += 1;

            frame.setSize(new Dimension(width, height));
            frame.setPreferredSize(new Dimension(width, height));
            frame.setMinimumSize(new Dimension(width, height));
            frame.setMaximumSize(new Dimension(width, height));


            // It will work as root panel.
            JPanel contentPane = (JPanel) frame.getContentPane();
            LayoutManager layout = getLayout();
            contentPane.setLayout(layout);

            // parse the body of window.
            parseBody(contentPane, true);

            frame.setVisible(true);
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        }
        // If there is still some words but not "Window";
        if (words.size() != wordIndex) {
            error(words.size() - 1, "Unexpected symbols Grammar should end now");
        }
    }

    /**
     * Gets a string in the Grammar format.
     * @return String
     */
    String getString() {
        String cur = words.get(wordIndex);
        wordIndex += 1;
        if(cur.startsWith("\"") && (cur.endsWith("\"") || cur.endsWith("\";"))) return cur.replaceAll("_", " ");
        error(wordIndex, "Invalid String Syntax");
        return " ";
    }

    /**
     * Returns the string, if given string follows the GRAMMAR of String.
     * e.x "hello" = hello
     * @param s String in the file.
     * @return String without ".
     */
    String ifStringGetString(String s) {
        if (!s.startsWith("\"") || !s.endsWith("\"")) {
            error(wordIndex, "String must be enclosed in \"\"");
        }
        s = s.substring(1, s.length() - 1);
        if (s.contains("\"")) error(wordIndex, "String must not contain \"");
        return s;
    }

    /**
     * Return int in java, if given string is int as defined in Grammar.
     * @param s String as Integer in Grammar
     * @return int in java
     */
    int ifIntGetInt(String s) {
        try {
            return Integer.parseInt(s);
        } catch (Exception e) {
            error(wordIndex, "Not a valid Integer");
            return -1;
        }
    }


    /**
     * Returns Layout manager as per defined in GUI file.
     * @return LayoutManger
     */
    private LayoutManager getLayout() {
        if (!words.get(wordIndex).equals("Layout")) {
            error(wordIndex, "Layout must start with 'Layout'");
        }
        wordIndex += 1;
        if (words.get(wordIndex).equals("Flow:")) {
            wordIndex += 1;
            return new FlowLayout();
        } else if (words.get(wordIndex).startsWith("Grid")) {
            return getGridLayout();
        } else {
            error(wordIndex, "Layout Must be one of 'Flow:' or 'Grid(row, cols, [hgap, vgap]):'");
            return null;
        }
    }

    /**
     * Parses the grammar to get gridlayout.
     * @return GridLayoutManager
     */
    private LayoutManager getGridLayout() {
        GridLayout layout = new GridLayout();

        String params = words.get(wordIndex);

        // initialize with defaults.
        int row = layout.getRows(), cols = layout.getColumns(), vgap = layout.getVgap(), hgap = layout.getHgap();

        params = params.replaceAll("Grid\\(", "");
        if (!params.endsWith(",")) error(wordIndex, "Size should be separated by comma");

        // get rows.
        row = ifIntGetInt(params.substring(0, params.length() - 1));
        wordIndex += 1;

        // get columns
        params = words.get(wordIndex);
        // 4 params
        if (params.endsWith(",")) {
            cols = ifIntGetInt(params.substring(0, params.length() - 1));
            wordIndex += 1;

            params = words.get(wordIndex);
            if (!params.endsWith(",")) error(wordIndex, "Size should be separated by comma");
            // get hgap.
            hgap = ifIntGetInt(params.substring(0, params.length() - 1));
            wordIndex += 1;

            params = words.get(wordIndex);
            if (!params.endsWith("):")) error(wordIndex, "Grid should end with ):");

            // get vgap.
            vgap = ifIntGetInt(params.substring(0, params.length() - 2));
            wordIndex += 1;
        } else if (params.endsWith("):")) {
            cols = ifIntGetInt(params.substring(0, params.length() - 2));
            wordIndex += 1;
        } else {
            error(wordIndex, "Size should be separated by comma");
        }

        // set the values.
        layout.setRows(row);
        layout.setColumns(cols);
        layout.setHgap(hgap);
        layout.setVgap(vgap);
        return layout;
    }


    /**
     * Parses the body of Window or Panel recursively.
     * @param contentPane Panel to add components in.
     * @param root if true be are direct child of root panel, else we are in sub panel.
     */
    private void parseBody(JPanel contentPane, boolean root) {
        while (!words.get(wordIndex).equals("End;") && !(root && words.get(wordIndex).equals("End."))) {
            switch (words.get(wordIndex)) {
                case "Button":
                    wordIndex += 1;
                    JButton btn = getButton();
                    contentPane.add(btn);
                    break;
                case "Label":
                    wordIndex += 1;
                    JLabel label = getLabel();
                    contentPane.add(label);
                    break;
                case "Group":
                    wordIndex += 1;
                    List<JRadioButton> btns = getGroup();
                    ButtonGroup btnGroup = new ButtonGroup();
                    for (JRadioButton rbtn : btns) {
                        btnGroup.add(rbtn);
                        contentPane.add(rbtn);
                    }
                    break;
                case "Panel":
                    wordIndex += 1;
                    JPanel panel = new JPanel();
                    LayoutManager manager = getLayout();
                    panel.setLayout(manager);
                    parseBody(panel, false);
                    contentPane.add(panel);
                    break;
                case "Textfield":
                    wordIndex += 1;
                    JTextField field = getTextField();
                    contentPane.add(field);
                    break;
                case "":
                    wordIndex += 1;
                    break;
                default:
                    error(wordIndex, "Unexpected Token.");
                    break;
            }

        }
        if (root && !words.get(wordIndex).equals("End.")) {
            error(wordIndex, "Grammar should end with End.");
        }
        wordIndex += 1;
    }

    /**
     * Gets Group of RadioButton as defined in Grammar.
     * @return List of JRadioButton defined in group.
     */
    private List<JRadioButton> getGroup() {
        List<JRadioButton> btns = new ArrayList<>();
        while(!words.get(wordIndex).equals("End;")) {
            if(words.get(wordIndex).equals("radio_button")) {
                wordIndex += 1;
                btns.add(getRadioBtn());
            } else if(words.get(wordIndex).equals("")) {
                wordIndex += 1;
            } else {
                error(wordIndex, "Group should only contain radio_button");
            }
        }
        wordIndex += 1;
        return btns;
    }

    /**
     * Gets a single JRadioButton as defined in group.
     * @return JRadioButton
     */
    private JRadioButton getRadioBtn() {
        JRadioButton rbtn = new JRadioButton();
        String label = getString();
//        wordIndex += 1;
        if(!label.endsWith(";")) error(wordIndex, "radio_button should end with ';'");
        label = ifStringGetString(label.substring(0, label.length() - 1));
        rbtn.setText(label);
        return rbtn;
    }

    /**
     * Gets a Tectfield as defined in Grammar.
     * @return JTextFeild
     */
    private JTextField getTextField() {
        JTextField textField = new JTextField();
        String cols = words.get(wordIndex);
        if (!cols.endsWith(";")) error(wordIndex, "Textfeild should end with ';'");
        int col = ifIntGetInt(cols.substring(0, cols.length() - 1));
        textField.setColumns(col);
        wordIndex += 1;
        return textField;
    }

    /**
     * Returns a Button as Defined in grammar.
     * @return JButton
     */
    private JButton getButton() {
        JButton btn = new JButton();
        String label = getString();
        if (!label.endsWith(";")) error(wordIndex, "Button should end with ';'");
        label = ifStringGetString(label.substring(0, label.length() - 1));
        btn.setText(label);
//        wordIndex += 1;
        return btn;
    }

    /**
     * Returns a Label as defined in grammar.
     * @return JLabel
     */
    private JLabel getLabel() {
        JLabel label = new JLabel();
        String text = getString();
        if (!text.endsWith(";")) error(wordIndex, "Label should end with ';'");
        text = ifStringGetString(text.substring(0, text.length() - 1));
        label.setText(text);
//        wordIndex += 1;
        return label;
    }

    /**
     * Prints Error with word index and message, exits the program.
     */
    public void error(int word, String message) {
        System.err.println("[" + words.get(word) + "] Error at word " + (word + 1) + ": " + message);
        System.exit(-1);
    }
}

public class Main {
    public static void main(String[] args) throws IOException {
        // Get the input file from user as an cmd line argument!
        if (args.length < 1) {
            System.err.println("Please provide an input file to parse!");
            System.exit(0);
        }
        File file = new File(args[0]);
        if (!file.exists()) {
            System.err.println("Input file " + args[0] + " does not exist!");
            System.exit(0);
        }
        // If file exits create a Parser and Parse the file.
        new Parser(file);
    }
}
/*
Window "Calculator" (200, 200) Layout Flow:
    Textfield 20;
    Panel Layout Flow:
        Button "7";
        Button "8";
        Button "9";
        Button "4";
        Button "5";
        Button "6";
        Button "1";
        Button "2";
        Button "3";
        Label "";
        Button "0";
        Group
            radio_button "Male";
            radio_button "Female";
        End;
        Panel Layout Grid(1, 2):
            Panel Layout Grid(1, 1):
                Label "Hello";
            End;
            Panel Layout Grid(1, 1):
                Label "World!";
            End;
        End;
    End;
End.
 */