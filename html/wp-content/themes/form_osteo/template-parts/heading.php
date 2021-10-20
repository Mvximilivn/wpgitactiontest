<div class="heading">
        
    <?php 
        $image = get_field('heading-image');
        $size = 'full';
    ?>

    <div class="heading__image" style="background-image: url(<?php if( !empty( $image ) ): echo esc_url($image['url']); endif; ?>)">
        <div class="inner">
            <div class="heading__title title-1"><?php the_field('heading-title'); ?></div>
        </div>
    </div>
</div>