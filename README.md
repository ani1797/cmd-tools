# Command line Tools

Commands added to this tool.

- dep

    Installs or removes a typescript dependency with ease. Allows to install the @types and regular dependency with one command.

    To install types in devDependencies and regular dependency in dependencies:

    ```sh
        dep install lodash    
    ```
    To remove dependencies

    ```sh
        dep remove lodash
    ```

- clean

    Cleans the node_modules from all the projects in a folder. To start in interactive mode open using -i flag

    ```sh
        clean -i
    ```

For more info check the help menu

```sh
    dep help
    dep install help
    dep remove help
    dep clean help
```
