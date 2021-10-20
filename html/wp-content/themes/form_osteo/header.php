<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package form_osteo
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<style>
		@import url('https://fonts.googleapis.com/css2?family=Andada+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Bree+Serif&family=Libre+Baskerville:wght@400;700&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:ital,wght@0,200;0,300;0,500;1,200;1,300;1,500&family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Roboto+Slab:wght@300;500;700&family=Lora:ital,wght@0,400;0,600;1,400;1,600&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Bitter:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Volkhov:ital,wght@0,400;0,700;1,400;1,700&display=swap');
	</style>

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'form_osteo' ); ?></a>

	<header id="masthead" class="site-header header js-header">
		<div class="header__container">
			<div class="inner">
				<div class="header__content">
					<div class="site-branding header__logo">
						<div class="header__logo">
							<img src="<?php echo get_template_directory_uri(); ?>/resources/dist/images/formosteo-logo-white.png" class="header__logo-img header__logo-white"/>
							<img src="<?php echo get_template_directory_uri(); ?>/resources/dist/images/formosteo-logo.png" class="header__logo-img header__logo-color"/>
						</div>

						<?php /*the_custom_logo();*/ ?>

						<!--<?php
						if ( is_front_page() && is_home() ) :
							?>
							<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
							<?php
						else :
							?>
							<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
							<?php
						endif;
						$form_osteo_description = get_bloginfo( 'description', 'display' );
						if ( $form_osteo_description || is_customize_preview() ) :
							?>
							<p class="site-description"><?php echo $form_osteo_description; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
						<?php endif; ?>-->
					</div><!-- .site-branding -->

					<nav id="site-navigation" class="main-navigation header__menu">
						<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'form_osteo' ); ?></button>
						<?php
						wp_nav_menu(
							array(
								'theme_location' => 'menu-1',
								'menu_id'        => 'primary-menu',
							)
						);
						?>
					</nav><!-- #site-navigation -->
				</div>
			</div>
		</div>
	</header><!-- #masthead -->
