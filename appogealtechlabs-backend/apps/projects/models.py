from django.db import models
from django.utils.text import slugify
from apps.core.models import TimeStampedModel


class TechStack(TimeStampedModel):
    """Technology/Tool used in projects"""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    icon = models.ImageField(upload_to='tech_icons/', blank=True, null=True)
    description = models.TextField(
        help_text="Why we use this technology - for Tech Insights page"
    )
    
    class Meta:
        verbose_name = "Tech Stack Item"
        verbose_name_plural = "Tech Stack"
        ordering = ['name']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name


class Project(TimeStampedModel):
    """Portfolio project with optional case study details"""
    
    CATEGORY_CHOICES = [
        ('web', 'Web Application'),
        ('mobile', 'Mobile App'),
        ('api', 'API/Backend'),
        ('ecommerce', 'E-Commerce'),
        ('other', 'Other'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='web')
    
    # Basic project info
    short_description = models.CharField(max_length=300)
    cover_image = models.ImageField(upload_to='projects/')
    live_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    
    # Case Study fields
    challenge_text = models.TextField(
        blank=True,
        help_text="The problem/challenge the client faced"
    )
    solution_text = models.TextField(
        blank=True,
        help_text="How we solved it - technical approach"
    )
    results_metrics = models.JSONField(
        blank=True,
        null=True,
        help_text='Example: {"load_time": "-40%", "conversions": "+25%"}'
    )
    
    # Relations
    technologies = models.ManyToManyField(TechStack, related_name='projects')
    
    # Meta
    featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title
    
    @property
    def is_case_study(self):
        """Returns True if this project has case study content"""
        return bool(self.challenge_text and self.solution_text)
