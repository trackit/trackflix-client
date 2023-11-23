exports.onCreateWebpackConfig = ({ stage, actions }) => {
    if (stage === 'build-html' || stage === 'develop-html') {
        actions.setWebpackConfig({
            module: {
                rules: [],
            },
        })
    }
}
