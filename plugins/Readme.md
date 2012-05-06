# Ned Bot - Artificial Intelligence for HipChat

## Adding Plugins

### Including Files

- You can simply drop plugin files in this directory and they will automatically be added
- You just need to restart **server.js** for the new plugins to take place

### Organizing Plugins

- You can also put them in various folders to avoid clutter                    
- The folders can be created with any name/category
- They can be nested within other folders without any problems
    
- Example
    
    ```sh
    - /plugins
        - /search
            - /external
                - bing.js
        - /private
            - /internalTools
                - project1.js
            - /externalTools
                - project1.js
        - index.js
    ```
