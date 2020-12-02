import Animation from './BannerAnimation';

export default {
    /**
     * The beforeCreate hook runs at the very initialization of your component.
     * Data has not been made reactive, and events have not been set up yet.
    */
    beforeCreate() {},

    /**
     * In the created hook, you will be able to access reactive data and events are active.
     * Templates and Virtual DOM have not yet been mounted or rendered.
    */
    created() {},

    /**
     * The updated hook runs after data changes on your component and the DOM re-renders.
     * If you need to access the DOM after a property change, here is probably the safest place to do it.
    */
    updated() {},

    /**
     * In the mounted hook, you will have full access to the reactive component, templates, and rendered DOM (via. this.$el).
     * Mounted is the most-often used lifecycle hook. The most frequently used patterns are fetching data for your component
     * (use created for this instead) and modifying the DOM, often to integrate non-Vue libraries.
    */
    mounted() {
        this.animation = new Animation(this);
        this.animation.createMainTimeline();
        this.animation.play();
    },
}
