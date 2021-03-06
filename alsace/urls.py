from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin
from django.http.response import HttpResponse

from wagtail.admin import urls as wagtailadmin_urls
from wagtail.core import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls
from wagtail.contrib.sitemaps.views import sitemap

from search import views as search_views

from base.views import MailchimpSignUpView, FacebookWebhook

urlpatterns = [
    url(r'^django-admin/', admin.site.urls),

    url(r'^admin/', include(wagtailadmin_urls)),
    url(r'^documents/', include(wagtaildocs_urls)),

    url(r'^search/$', search_views.search, name='search'),

    url(r'^mce_signup/$', MailchimpSignUpView.as_view(), name='mce_signup'),
    url(r'^fb_webhook/$', FacebookWebhook.as_view(), name='fb_webhook'),

    url('^sitemap\.xml$', sitemap),
    url(r'^robots.txt$', lambda r: HttpResponse("User-agent: *\nDisallow:/admin/")),

    # For anything not caught by a more specific rule above, hand over to
    # Wagtail's page serving mechanism. This should be the last pattern in
    # the list:
    url(r'', include(wagtail_urls)),
]



if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
